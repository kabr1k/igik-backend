import { ApiProperty } from '@nestjs/swagger';

export class CalendlyCancelDto {
  @ApiProperty()
  event_link: string;
  @ApiProperty()
  mentor_uuid: string;
}
