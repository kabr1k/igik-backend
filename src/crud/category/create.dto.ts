import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../user/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class CategoryCreateDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: UserDto[];
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  slug: string;
}
