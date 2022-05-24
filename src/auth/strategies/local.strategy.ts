import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../login/login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.loginService.validateUser(email, password);
    switch (user) {
      case 401:
        throw new HttpException('Invalid credentials', 401);
      case 404:
        throw new HttpException('User not found', 404);
      case 406:
        throw new HttpException('Email is not confirmed', 406);
      default:
        return user;
    }
  }
}
