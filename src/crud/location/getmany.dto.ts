import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { LocationDto } from './dto';

@Exclude()
export class LocationGetmanyDto {
  @Expose()
  @Type(() => LocationDto)
  @ApiProperty({
    type: [LocationDto],
  })
  data: LocationDto[];
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
