import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../users/user.entity';
import { UserDto } from '../user/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class LocationUpdateDto {
  @ApiProperty()
  uuid: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  imagePath: string;
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: User[];
}
