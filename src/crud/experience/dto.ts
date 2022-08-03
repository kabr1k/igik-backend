import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { UserDto } from "../user/dto";
class PictureDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
}
@Exclude()
export class ExperienceDto {
  @Expose()
  @ApiProperty()
  uuid: string;
  @Expose()
  @ApiPropertyOptional()
  name: string;
  @Expose()
  @ApiPropertyOptional()
  ordering: number;
  @Expose()
  @ApiPropertyOptional({
    type: [UserDto],
  })
  users: UserDto[];
}
