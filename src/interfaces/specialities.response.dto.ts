import { ApiProperty } from '@nestjs/swagger';

export class SpecialitiesResponseDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
}
