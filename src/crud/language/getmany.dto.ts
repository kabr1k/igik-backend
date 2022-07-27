import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { LanguageDto } from './dto';

@Exclude()
export class LanguageGetmanyDto {
  @Expose()
  @Type(() => LanguageDto)
  @ApiProperty({
    type: [LanguageDto],
  })
  data: LanguageDto[];
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
