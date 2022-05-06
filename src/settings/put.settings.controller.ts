import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { SettingsDto } from '../interfaces/settings.dto';

@Controller()
export class PutSettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Put('settings')
  @ApiTags('Settings API')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtGuard)
  async putSettings(@Body() settings: SettingsDto) {
    await this.settingsService.saveSettings({
      id: 1,
      ...settings,
    });
  }
}
