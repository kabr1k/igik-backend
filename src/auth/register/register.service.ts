import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { createHash } from 'crypto';
import { User } from '../../users/user.entity';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  public async createUser({ email, password, role, name }): Promise<User | null> {
    if (await this.usersService.findByEmail(email)) {
      return null;
    } else {
      return await this.usersService.saveUser({
        email,
        role,
        name,
        passwordHash: createHash('sha256').update(password).digest('hex'),
      });
    }
  }
}
