import { ApiProperty } from '@nestjs/swagger';

export class SignatureDto {
  @ApiProperty()
  signature: string;
}
