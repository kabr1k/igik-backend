import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  mentor_uuid: string;
  @ApiProperty()
  amount: number;
}
