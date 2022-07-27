import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from './dto';

@Exclude()
export class CategoryGetmanyDto {
  @Expose()
  @Type(() => CategoryDto)
  @ApiProperty({
    type: [CategoryDto],
  })
  data: CategoryDto[];
  @Expose()
  @ApiProperty()
  count: number;
  @Expose()
  @ApiProperty()
  total: number;
  @Expose()
  @ApiProperty()
  page: number;
  @Expose()
  @ApiProperty()
  pageCount: number;
}
