import { ApiProperty } from '@nestjs/swagger';

export class RedirectDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  statusCode: number;
}
