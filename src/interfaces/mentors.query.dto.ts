import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import common from '../common/entity.mixin';
import { Category } from '../category/category.entity';
import { Speciality } from '../speciality/speciality.entity';
import { PriceRangeDto } from './price.range.dto';
import { SpecialityDto } from "./speciality.dto";
import { Experience } from "../experience/experience.entity";
import { ExperienceDto } from "./experience.dto";
export class MentorsQueryDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  page: number;
  @ApiPropertyOptional(common.varcharNullable)
  search: string;
  @ApiPropertyOptional()
  category: Category;
  @ApiPropertyOptional({ type: () => [SpecialityDto] })
  specialities: Speciality[];
  @ApiPropertyOptional({ type: () => [ExperienceDto] })
  experiences: Experience[];
  @ApiPropertyOptional()
  priceRange: PriceRangeDto;
}
