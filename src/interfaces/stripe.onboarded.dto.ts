import { ApiProperty } from '@nestjs/swagger';

export class StripeOnboardedDto {
  @ApiProperty()
  onboarded: boolean;
}
