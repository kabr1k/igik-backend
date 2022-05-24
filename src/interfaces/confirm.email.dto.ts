import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  email: string;
}
