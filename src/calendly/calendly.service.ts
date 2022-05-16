import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CalendlyService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  private async getTokenByCode(authorizationCode) {
    try {
      const response = await axios.post(
        'https://auth.calendly.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('CAL_CLIENT_ID'),
          client_secret: this.configService.get('CAL_CLIENT_SECRET'),
          code: authorizationCode,
          redirect_uri: this.configService.get('CAL_REDIRECT_URI'),
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
  private async getTokenByRefresh(refreshToken) {
    try {
      const response = await axios.post(
        'https://auth.calendly.com/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: this.configService.get('CAL_CLIENT_ID'),
          client_secret: this.configService.get('CAL_CLIENT_SECRET'),
          refresh_token: refreshToken,
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
  private async getCalendlyUser(accessToken) {
    try {
      const response = await axios.get('https://api.calendly.com/users/me', {
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
  public async connectUser(user, authorizationCode): Promise<void | null> {
    const { calendlyRefreshToken } = await this.usersService.findByEmail(
      user.email,
    );
    let data;
    if (calendlyRefreshToken) {
      data = await this.getTokenByRefresh(calendlyRefreshToken);
    } else {
      data = await this.getTokenByCode(authorizationCode);
    }
    const calendlyUser = await this.getCalendlyUser(data.access_token);
    await this.usersService.saveUser({
      uuid: user.uuid,
      calendlyRefreshToken: data.refresh_token,
      calendlyLink: calendlyUser.resource.scheduling_url,
    });
  }
}
