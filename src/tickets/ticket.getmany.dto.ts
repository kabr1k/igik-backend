import { Expose, Exclude, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { TicketDto } from './ticket.dto';

@Exclude()
export class TicketGetmanyDto {
  @Expose()
  @Type(() => TicketDto)
  @ApiProperty({
    type: [TicketDto],
  })
  data: TicketDto[];
  @Expose()
  @ApiProperty()
  count: number;
  @Expose()
  @ApiProperty()
  total: number;
  @Expose()
  @ApiProperty()
  page: number;
  @Expose()
  @ApiProperty()
  pageCount: number;
}
