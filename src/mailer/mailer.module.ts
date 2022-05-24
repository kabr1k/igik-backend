import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfirmController } from './confirm.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [MailerService, ConfigService],
  controllers: [ConfirmController],
  exports: [MailerService],
})
export class MailerModule {}
