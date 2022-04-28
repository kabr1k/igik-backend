import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  password: string;
}
