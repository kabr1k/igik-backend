import { ApiProperty } from '@nestjs/swagger';

export class TextDto {
  @ApiProperty()
  slug: string;
  @ApiProperty()
  name: string;
}
