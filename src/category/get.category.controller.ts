import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Category } from './category.entity';

@Controller()
export class GetCategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('category')
  @ApiTags('Categories')
  @ApiOperation({
    description: 'Get category by UUID, returns category with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Category,
  })
  async find(@Query() query: CategoryDto) {
    return await this.categoryService.findOne(query.uuid);
  }
}
