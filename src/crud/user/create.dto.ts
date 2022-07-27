import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderDto } from '../order/dto';
import { SpecialityDto } from '../speciality/dto';
import { CategoryDto } from '../category/dto';
import { LanguageDto } from '../language/dto';
import { LocationDto } from '../location/dto';
import { ExperienceDto } from '../experience/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class UserCreateDto {
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  walletAddress: string;
  @ApiPropertyOptional()
  nonce: number;
  @ApiPropertyOptional()
  active: boolean;
  @ApiPropertyOptional()
  enabled: boolean;
  @ApiPropertyOptional()
  firstName: string;
  @ApiPropertyOptional()
  lastName: string;
  @ApiPropertyOptional()
  role: string;
  @ApiPropertyOptional()
  passwordHash: string;
  @ApiPropertyOptional()
  calendlyLink: string;
  @ApiPropertyOptional()
  calendlyUserLink: string;
  @ApiPropertyOptional()
  calendlyRefreshToken: string;
  @ApiPropertyOptional({
    type: [OrderDto],
  })
  postedOrders: OrderDto[];
  @ApiPropertyOptional({
    type: [OrderDto],
  })
  receivedOrders: OrderDto[];
  @ApiPropertyOptional({
    type: [SpecialityDto],
  })
  specialities: SpecialityDto[];
  @ApiPropertyOptional({
    type: CategoryDto,
  })
  category: CategoryDto;
  @ApiPropertyOptional({
    type: [LanguageDto],
  })
  languages: LanguageDto[];
  @ApiPropertyOptional({
    type: LocationDto,
  })
  location: LocationDto;
  @ApiPropertyOptional({
    type: ExperienceDto,
  })
  experience: ExperienceDto;
  @ApiPropertyOptional()
  stripeAccount: string;
  @ApiPropertyOptional()
  stripeProductId: string;
  @ApiPropertyOptional()
  stripePriceId: string;
  @ApiPropertyOptional()
  avatarS: string;
  @ApiPropertyOptional()
  avatarM: string;
  @ApiPropertyOptional()
  avatarL: string;
  @ApiPropertyOptional()
  stripeOnboarded: boolean;
  @ApiPropertyOptional()
  emailConfirmed: boolean;
  @ApiPropertyOptional()
  eventPrice: number;
  @ApiPropertyOptional()
  eventDuration: number;
  @ApiPropertyOptional()
  timezone: string;
  @ApiPropertyOptional()
  socialNetwork1: string;
  @ApiPropertyOptional()
  socialNetwork2: string;
  @ApiPropertyOptional()
  socialNetwork3: string;
  @ApiPropertyOptional()
  about: string;
  @ApiPropertyOptional()
  socialNetworks: string;
  @ApiPropertyOptional()
  createdAt: string;
  @ApiPropertyOptional()
  updatedAt: string;
}
