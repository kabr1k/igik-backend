import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  uuid: string;
}
