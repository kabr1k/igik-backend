import { ApiProperty } from '@nestjs/swagger';

export class RedirectDto {
  @ApiProperty()
  checkout_url: string;
}
