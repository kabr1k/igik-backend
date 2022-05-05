import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Length(1, 30)
  name: string;
  @ApiProperty()
  @IsString()
  role: string;
  @Length(1, 30)
  @ApiProperty()
  password: string;
}
