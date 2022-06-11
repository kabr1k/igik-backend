import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Language } from './language.entity';
import { LanguageDto } from "../interfaces/language.dto";
import { Speciality } from "../speciality/speciality.entity";
import { SpecialityDto } from "../interfaces/speciality.dto";

@Controller()
export class GetLanguageController {
  constructor(private readonly languageService: LanguageService) {}
  @Get('api/v1/language')
  @ApiTags('Languages')
  @ApiOperation({
    description: 'Get language by UUID, returns language with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Language,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: Language,
  })
  async find(@Query() query: LanguageDto) {
    const result = await this.languageService.findOne(query.uuid)
    if (result) {
      return result;
    } else {
      throw new HttpException('Not found', 404);
    }
  }
}
