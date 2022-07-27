import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { OrderDto } from "../order/dto";
import { SpecialityDto } from "../speciality/dto";
import { CategoryDto } from "../category/dto";
import { LanguageDto } from "../language/dto";
import { LocationDto } from "../location/dto";
import { ExperienceDto } from "../experience/dto";
class PictureDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
}
@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty()
  uuid: string;
  @ApiPropertyOptional()
  @Expose()
  email: string;
  @ApiPropertyOptional()
  @Expose()
  walletAddress: string;
  @ApiPropertyOptional()
  @Expose()
  nonce: number;
  @ApiPropertyOptional()
  @Expose()
  active: boolean;
  @ApiPropertyOptional()
  @Expose()
  enabled: boolean;
  @ApiPropertyOptional()
  @Expose()
  firstName: string;
  @ApiPropertyOptional()
  @Expose()
  lastName: string;
  @ApiPropertyOptional()
  @Expose()
  role: string;
  @ApiPropertyOptional()
  @Expose()
  passwordHash: string;
  @ApiPropertyOptional()
  @Expose()
  calendlyLink: string;
  @ApiPropertyOptional()
  @Expose()
  calendlyUserLink: string;
  @ApiPropertyOptional()
  @Expose()
  calendlyRefreshToken: string;
  @Expose()
  @ApiPropertyOptional({
    type: [OrderDto],
  })
  postedOrders: OrderDto[];
  @Expose()
  @ApiPropertyOptional({
    type: [OrderDto],
  })
  receivedOrders: OrderDto[];
  @Expose()
  @ApiPropertyOptional({
    type: [SpecialityDto],
  })
  specialities: SpecialityDto[];
  @Expose()
  @ApiPropertyOptional({
    type: CategoryDto,
  })
  category: CategoryDto;
  @ApiPropertyOptional({
    type: [LanguageDto],
  })
  languages: LanguageDto[];
  @Expose()
  @ApiPropertyOptional({
    type: LocationDto,
  })
  location: LocationDto;
  @Expose()
  @ApiPropertyOptional({
    type: ExperienceDto,
  })
  experience: ExperienceDto;
  @ApiPropertyOptional()
  @Expose()
  stripeAccount: string;
  @ApiPropertyOptional()
  @Expose()
  stripeProductId: string;
  @ApiPropertyOptional()
  @Expose()
  stripePriceId: string;
  @ApiPropertyOptional()
  @Expose()
  avatarS: string;
  @ApiPropertyOptional()
  @Expose()
  avatarM: string;
  @ApiPropertyOptional()
  @Expose()
  avatarL: string;
  @ApiPropertyOptional()
  @Expose()
  stripeOnboarded: boolean;
  @ApiPropertyOptional()
  @Expose()
  emailConfirmed: boolean;
  @ApiPropertyOptional()
  @Expose()
  eventPrice: number;
  @ApiPropertyOptional()
  @Expose()
  eventDuration: number;
  @ApiPropertyOptional()
  @Expose()
  timezone: string;
  @ApiPropertyOptional()
  @Expose()
  socialNetwork1: string;
  @ApiPropertyOptional()
  @Expose()
  socialNetwork2: string;
  @ApiPropertyOptional()
  @Expose()
  socialNetwork3: string;
  @ApiPropertyOptional()
  @Expose()
  about: string;
  @ApiPropertyOptional()
  @Expose()
  socialNetworks: string;
  @ApiPropertyOptional()
  @Expose()
  createdAt: string;
  @ApiPropertyOptional()
  @Expose()
  updatedAt: string;
}
