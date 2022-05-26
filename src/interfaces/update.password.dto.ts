import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  passwordConfirm: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  token: string;
}
