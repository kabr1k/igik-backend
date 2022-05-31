import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoriesResponseDto } from '../interfaces/categories.response.dto';

@Controller()
export class GetCategoriesController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('categories')
  @ApiTags('Categories')
  @ApiOperation({ description: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [CategoriesResponseDto],
  })
  async find(@Request() req) {
    return await this.categoryService.findAll();
  }
}
