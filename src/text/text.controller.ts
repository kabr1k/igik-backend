import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TextService } from './text.service';
import { Text } from './text.entity';
import { CategoriesResponseDto } from '../interfaces/categories.response.dto';
import { TextDto } from '../interfaces/text.dto';

@Controller()
export class TextController {
  constructor(private readonly textService: TextService) {}
  @Get('api/v1/text')
  @ApiTags('SEO')
  @ApiOperation({ description: 'Get SEO text' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Text,
  })
  async find(@Request() req, @Query() textDto: TextDto) {
    const text = await this.textService.findOne(textDto);
    return { ...text, name: textDto.name, server: true };
  }
}
