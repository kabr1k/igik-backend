import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { User } from '../../users/user.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | 404 | 401> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return 404;
    }
    const hash = createHash('sha256').update(password).digest('hex');
    if (user && user.passwordHash === hash) {
      return user;
    } else {
      return 401;
    }
  }

  public async login(user: User) {
    return {
      access_token: this.jwtService.sign({ sub: user }),
    };
  }
}
