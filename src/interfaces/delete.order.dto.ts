import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrderStatus } from "../enums/order.status";

export class DeleteOrderDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  status: OrderStatus;
  @ApiPropertyOptional()
  reason: string;
}
