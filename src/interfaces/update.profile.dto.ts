import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Speciality } from '../speciality/speciality.entity';
import { Category } from '../category/category.entity';
import { Language } from '../languages/language.entity';
import { Location } from '../location/location.entity';
import { Experience } from '../experience/experience.entity';
import { LocationDto } from './location.dto';
import { ExperienceDto } from './experience.dto';
import { LanguageDto } from './language.dto';
import { CategoryDto } from './category.dto';
import { SpecialityDto } from './speciality.dto';

export class UpdateProfileDto {
  @ApiProperty()
  firstName: string;
  @ApiPropertyOptional()
  lastName: string;
  @ApiPropertyOptional()
  password: string;
  @ApiPropertyOptional()
  calendlyLink: string;
  @ApiPropertyOptional()
  eventPrice: number;
  @ApiPropertyOptional()
  enabled: boolean;
  @ApiPropertyOptional({ type: () => [SpecialityDto] })
  specialities: [SpecialityDto];
  @ApiPropertyOptional({ type: () => [CategoryDto] })
  categories: [CategoryDto];
  @ApiPropertyOptional()
  language: LanguageDto;
  @ApiPropertyOptional()
  location: LocationDto;
  @ApiPropertyOptional()
  experience: ExperienceDto;
  @ApiPropertyOptional()
  timezone: number;
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional()
  about: string;
  @ApiPropertyOptional()
  socialNetworks: string;
}
// export class UpdateProfileDto extends PartialType(ProfileDto) {}
