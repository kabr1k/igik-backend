import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { UserDto } from '../user/dto';
class PictureDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
}
@Exclude()
export class CategoryDto {
  @Expose()
  @ApiProperty()
  uuid: string;
  @Expose()
  @ApiPropertyOptional()
  name: string;
  @Expose()
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: UserDto[];
  @Expose()
  @ApiProperty()
  imagePath: string;
  @Expose()
  @ApiProperty()
  slug: string;
}
