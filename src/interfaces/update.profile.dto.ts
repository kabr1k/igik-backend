import { ApiProperty, PartialType } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  calendlyLink: string;
  @ApiProperty()
  eventPrice: number;
}
export class UpdateProfileDto extends PartialType(ProfileDto) {}
