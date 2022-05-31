import { ApiProperty } from '@nestjs/swagger';

export class LocationsResponseDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
}
