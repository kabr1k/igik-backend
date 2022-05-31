import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from './language.service';

@Controller()
export class SeedLanguagesController {
  constructor(private readonly languageService: LanguageService) {}
  @Get('languages/seed')
  @ApiTags('Languages')
  @ApiOperation({
    description: 'Seed default languages to DB. Use only in dev environment',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.languageService.seed();
  }
}
