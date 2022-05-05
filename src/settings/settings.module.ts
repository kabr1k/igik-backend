import { Module } from '@nestjs/common';
import { GetSettingsController } from './get.settings.controller';
import { PutSettingsController } from './put.settings.controller';
import { PostWhitelistController } from './post.whitelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './settings.entity';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  providers: [SettingsService],
  controllers: [
    GetSettingsController,
    PutSettingsController,
    PostWhitelistController,
  ],
  exports: [],
})
export class SettingsModule {}
