import { ApiProperty } from '@nestjs/swagger';

export class ExperienceResponseDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
}
