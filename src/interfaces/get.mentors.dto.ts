import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/user.entity";

export class GetMentorsDto {
  @ApiProperty()
  mentors: User[];
  @ApiProperty()
  count: number;
}
