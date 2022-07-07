import { ApiProperty } from '@nestjs/swagger';

export class CategoriesResponseDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  imagePath: string;
}
