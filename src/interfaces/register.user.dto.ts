import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Length(1, 30)
  firstName: string;
  @ApiProperty()
  @Length(1, 30)
  lastName: string;
  @ApiProperty()
  @IsString()
  role: string;
  @Length(1, 30)
  @ApiProperty()
  password: string;
}
