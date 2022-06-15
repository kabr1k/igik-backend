import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrderStatus } from "../enums/order.status";

export class PutOrderDto {
  @ApiProperty()
  uuid: string;
  @ApiPropertyOptional()
  status: OrderStatus;
}
