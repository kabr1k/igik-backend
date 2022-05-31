import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@Controller()
export class SeedCategoriesController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('categories/seed')
  @ApiTags('Categories')
  @ApiOperation({
    description: 'Seed default categories to DB. Use only in dev environment',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.categoryService.seed();
  }
}
