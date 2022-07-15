import { Controller, Get, HttpException, Query, Request, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TextService } from './text.service';
import { Text } from './text.entity';
import { CategoriesResponseDto } from '../interfaces/categories.response.dto';
import { TextDto } from '../interfaces/text.dto';
import { CategoryService } from '../category/category.service';

@Controller()
export class TextController {
  constructor(
    private readonly textService: TextService,
    private readonly categoryService: CategoryService,
  ) {}
  @Get('api/v1/text')
  @ApiTags('SEO')
  @ApiOperation({ description: 'Get SEO text' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Text,
  })
  async find(@Request() req, @Query() { name, slug }: TextDto) {
    if (name === 'main') {
      const categories = await this.categoryService.findAll();
      return { categories, name, server: true };
    } else {
      const text = await this.textService.findBySlug(slug);
      const category = await this.categoryService.findBySlug(slug);
      if (category) {
        return {
          ...text,
          title: category.name,
          metaTitle: category.name,
          name,
          server: true,
        };
      } else {
        throw new HttpException('Slug not found', 404)
      }
    }
  }
}
