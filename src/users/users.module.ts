import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProfileMeController } from './profile.me.controller';
import { ProfileUpdateController } from './profile.update.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordUpdateController } from './password.update.controller';
import { PostAvatarController } from './post.avatar.controller';
import { ImageService } from './image.service';
import { MentorController } from './mentor.controller';
import { MentorsController } from './mentors.controller';
import { DeleteAvatarController } from './delete.avatar.controller';
import { CalendlyModule } from '../calendly/calendly.module';
import { MentorsCountController } from './mentors.count.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), CalendlyModule],
  providers: [UsersService, ConfigService, ImageService],
  controllers: [
    ProfileMeController,
    ProfileUpdateController,
    PasswordUpdateController,
    PostAvatarController,
    DeleteAvatarController,
    MentorController,
    MentorsController,
    MentorsCountController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
