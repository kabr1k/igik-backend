import { ApiProperty } from '@nestjs/swagger';

export class ExperienceDto {
  @ApiProperty()
  uuid: string;
}
