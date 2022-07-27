import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { OrderDto } from './dto';

@Exclude()
export class OrderGetmanyDto {
  @Expose()
  @Type(() => OrderDto)
  @ApiProperty({
    type: [OrderDto],
  })
  data: OrderDto[];
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
