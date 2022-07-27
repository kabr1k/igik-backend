import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { User } from '../../users/user.entity';
import { UserDto } from '../user/dto';
class PictureDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
}
@Exclude()
export class LocationDto {
  @Expose()
  @ApiProperty()
  uuid: string;
  @Expose()
  @ApiPropertyOptional()
  name: string;
  @Expose()
  @ApiPropertyOptional()
  imagePath: string;
  @Expose()
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: User[];
}
