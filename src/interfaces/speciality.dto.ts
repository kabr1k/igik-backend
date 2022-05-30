import { ApiProperty } from '@nestjs/swagger';

export class SpecialityDto {
  @ApiProperty()
  uuid: string;
}
