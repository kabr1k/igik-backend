import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProfileMeController } from './profile.me.controller';
import { ProfileUpdateController } from './profile.update.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordUpdateController } from './password.update.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, ConfigService],
  controllers: [
    ProfileMeController,
    ProfileUpdateController,
    PasswordUpdateController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
