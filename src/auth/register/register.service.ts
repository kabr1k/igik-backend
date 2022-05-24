import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { createHash } from 'crypto';
import { User } from '../../users/user.entity';
import { MailerService } from '../../mailer/mailer.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}
  public async createUser({
    email,
    password,
    role,
    firstName,
    lastName,
  }): Promise<User | null> {
    if (await this.usersService.findByEmail(email)) {
      return null;
    } else {
      const user = await this.usersService.saveUser({
        email,
        role,
        firstName,
        lastName,
        passwordHash: createHash('sha256').update(password).digest('hex'),
      });
      await this.mailerService.sendEmailConfirmation(user);
      return user;
    }
  }
}
