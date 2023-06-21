import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { CalendlyLinkDto } from '../interfaces/calendly.link.dto';
import axios from 'axios';
import * as moment from 'moment';

@Injectable()
export class CalendlyService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  private async getTokenByCode(authorizationCode, user) {
    try {
      const response = await axios.post(
        this.configService.get('CAL_TOKEN_URL'),
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('CAL_CLIENT_ID'),
          client_secret: this.configService.get('CAL_CLIENT_SECRET'),
          code: authorizationCode,
          redirect_uri: this.configService.get('CAL_REDIRECT_URI'),
        },
      );
      await this.usersService.saveUser({
        uuid: user.uuid,
        calendlyRefreshToken: response.data.refresh_token,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  async getTokenByRefresh(refreshToken, user) {
    try {
      const response = await axios.post(
        this.configService.get('CAL_TOKEN_URL'),
        {
          grant_type: 'refresh_token',
          client_id: this.configService.get('CAL_CLIENT_ID'),
          client_secret: this.configService.get('CAL_CLIENT_SECRET'),
          refresh_token: refreshToken,
        },
      );
      await this.usersService.saveUser({
        uuid: user.uuid,
        calendlyRefreshToken: response.data.refresh_token,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  private async getCalendlyUser(accessToken) {
    try {
      const response = await axios.get(this.configService.get('CAL_USER_URL'), {
        headers: { Authorization: 'Bearer ' + accessToken },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  public async getCalendlyEventTypes(accessToken, user) {
    try {
      const response = await axios.get(
        this.configService.get('CAL_EVENT_TYPES_URL') +
          `?user=${user.calendlyUserLink}`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
          params: {
            user: user.calendlyUserLink,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  public async getCalendlyEvents(accessToken, user) {
    const min_start_time = moment().add(-1, 'day').toISOString();
    console.log('min_start_time', min_start_time);
    try {
      const response = await axios.get(
        this.configService.get('CAL_EVENTS_URL') +
          `?count=100&user=${user.calendlyUserLink}`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
          params: {
            user: user.calendlyUserLink,
            min_start_time,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.details);
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  public async cancelCalendlyEvent(accessToken, eventLink, reason) {
    try {
      const response = await axios.post(
        `${eventLink}/cancellation`,
        {
          reason,
        },
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response.data.error_description,
        error.response.status,
      );
    }
  }
  public async connectUser(user, authorizationCode): Promise<void> {
    const { calendlyRefreshToken } = await this.usersService.findByEmail(
      user.email,
    );
    let data;
    if (calendlyRefreshToken) {
      data = await this.getTokenByRefresh(calendlyRefreshToken, user);
    } else {
      data = await this.getTokenByCode(authorizationCode, user);
    }
    const calendlyUser = await this.getCalendlyUser(data.access_token);
    await this.usersService.saveUser({
      uuid: user.uuid,
      timezone: calendlyUser.resource.timezone,
      calendlyUserLink: calendlyUser.resource.uri,
    });
  }
  public async cancelEvent(mentorUuid, eventLink, reason): Promise<void> {
    const user = await this.usersService.findByUuid(mentorUuid);
    const { access_token } = await this.getTokenByRefresh(
      user.calendlyRefreshToken,
      user,
    );
    return await this.cancelCalendlyEvent(access_token, eventLink, reason);
  }
}
