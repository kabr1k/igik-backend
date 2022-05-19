import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../login/login.service';
import { camelCase } from 'typeorm/util/StringUtils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.loginService.validateUser(email, password);
    switch (user) {
      case 401:
        throw new UnauthorizedException();
      case 404:
        throw new NotFoundException();
      default:
        return user;
    }
  }
}
