import { ApiProperty } from '@nestjs/swagger';

export class MentorQueryDto {
  @ApiProperty()
  uuid: string;
}
