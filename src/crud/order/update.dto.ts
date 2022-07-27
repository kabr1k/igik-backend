import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../enums/order.status';
import { UserDto } from '../user/dto';
class UuidDto {
  @ApiProperty()
  readonly uuid: number;
}
export class OrderUpdateDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  price: number;
  @ApiPropertyOptional()
  duration: number;
  @ApiPropertyOptional()
  joinUrl: string;
  @ApiPropertyOptional()
  status: OrderStatus;
  @ApiProperty({
    type: UserDto,
  })
  buyer: UserDto;
  @ApiProperty({
    type: UserDto,
  })
  seller: UserDto;
  @ApiPropertyOptional()
  eventLink: string;
  @ApiPropertyOptional()
  startTime: string;
  @ApiPropertyOptional()
  createdAt: string;
  @ApiPropertyOptional()
  updatedAt: string;
}
