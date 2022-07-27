import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { ExperienceDto } from './dto';

@Exclude()
export class ExperienceGetmanyDto {
  @Expose()
  @Type(() => ExperienceDto)
  @ApiProperty({
    type: [ExperienceDto],
  })
  data: ExperienceDto[];
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
