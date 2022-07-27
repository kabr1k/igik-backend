import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { SpecialityDto } from './dto';

@Exclude()
export class SpecialityGetmanyDto {
  @Expose()
  @Type(() => SpecialityDto)
  @ApiProperty({
    type: [SpecialityDto],
  })
  data: SpecialityDto[];
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
