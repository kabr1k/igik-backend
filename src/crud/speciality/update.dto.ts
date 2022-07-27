import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../user/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class SpecialityUpdateDto {
  @ApiProperty()
  uuid: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: UserDto[];
}
