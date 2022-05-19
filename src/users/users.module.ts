import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProfileMeController } from './profile.me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [ProfileMeController],
  exports: [UsersService],
})
export class UsersModule {}
