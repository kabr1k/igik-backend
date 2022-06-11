import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Category } from './category.entity';
import { Speciality } from "../speciality/speciality.entity";
import { SpecialityDto } from "../interfaces/speciality.dto";

@Controller()
export class GetCategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('api/v1/category')
  @ApiTags('Categories')
  @ApiOperation({
    description: 'Get category by UUID, returns category with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Category,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: Category,
  })
  async find(@Query() query: CategoryDto) {
    const result = await this.categoryService.findOne(query.uuid)
    if (result) {
      return result;
    } else {
      throw new HttpException('Not found', 404);
    }
  }
}
