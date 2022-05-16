import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationCodeDto {
  @ApiProperty()
  code: string;
}
