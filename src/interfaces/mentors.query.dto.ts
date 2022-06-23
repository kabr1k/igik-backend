import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import common from '../common/entity.mixin';
import { Category } from '../category/category.entity';
import { Speciality } from '../speciality/speciality.entity';
import { PriceRangeDto } from './price.range.dto';
export class MentorsQueryDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  page: number;
  @ApiPropertyOptional(common.varcharNullable)
  search: string;
  @ApiPropertyOptional()
  category: Category;
  @ApiPropertyOptional()
  specialities: Speciality[];
  @ApiPropertyOptional()
  priceRange: PriceRangeDto;
}
