import { ApiProperty } from '@nestjs/swagger';

export class StripeLinkDto {
  @ApiProperty()
  stripe_link: string;
}
