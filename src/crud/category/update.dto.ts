import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '../user/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class CategoryUpdateDto {
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
