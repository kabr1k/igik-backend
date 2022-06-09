import { ApiProperty } from '@nestjs/swagger';

export class LanguagesResponseDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  imagePath: string;
}
