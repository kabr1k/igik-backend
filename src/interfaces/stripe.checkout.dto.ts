import { ApiProperty } from '@nestjs/swagger';

export class StripeCheckoutDto {
  @ApiProperty()
  order_id: string;
}
