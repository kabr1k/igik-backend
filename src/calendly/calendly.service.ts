import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { CalendlyLinkDto } from '../interfaces/calendly.link.dto';
import axios from 'axios';

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
  public async getCalendlyEvents(accessToken, user) {
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
}
