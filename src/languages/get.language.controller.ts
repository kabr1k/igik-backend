import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Language } from './language.entity';
import { LanguageDto } from "../interfaces/language.dto";

@Controller()
export class GetLanguageController {
  constructor(private readonly categoryService: LanguageService) {}
  @Get('language')
  @ApiTags('Languages')
  @ApiOperation({
    description: 'Get language by UUID, returns language with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Language,
  })
  async find(@Query() query: LanguageDto) {
    return await this.categoryService.findOne(query.uuid);
  }
}
