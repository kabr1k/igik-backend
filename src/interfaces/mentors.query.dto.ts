import { ApiProperty } from '@nestjs/swagger';

export class MentorsQueryDto {
  @ApiProperty()
  amount: number;
  @ApiProperty()
  page: number;
}
