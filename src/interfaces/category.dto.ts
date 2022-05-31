import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  uuid: string;
}
