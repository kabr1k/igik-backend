import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SettingsService } from './settings.service';

@Controller()
export class GetSettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Get('settings')
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
  @ApiResponse({
    status: 404,
    description: 'No settings found in DB',
  })
  @UseGuards(JwtGuard)
  async getSettings(@Request() req) {
    const settings = await this.settingsService.getSettings();
    if (settings) {
      return settings;
    } else {
      throw new NotFoundException();
    }
  }
}
