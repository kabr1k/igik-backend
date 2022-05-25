import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class RecoverDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
