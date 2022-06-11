import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { LanguagesResponseDto } from "../interfaces/languages.response.dto";

@Controller()
export class GetLanguagesController {
  constructor(private readonly languageService: LanguageService) {}
  @Get('api/v1/languages')
  @ApiTags('Languages')
  @ApiOperation({ description: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [LanguagesResponseDto],
  })
  async find(@Request() req) {
    return await this.languageService.findAll();
  }
}
