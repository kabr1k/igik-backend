import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { OrderStatus } from '../../enums/order.status';
import { UserDto } from '../user/dto';
class PictureDto {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly path: string;
}
@Exclude()
export class OrderDto {
  @Expose()
  @ApiProperty()
  id: number;
  @Expose()
  @ApiPropertyOptional()
  price: number;
  @Expose()
  @ApiPropertyOptional()
  duration: number;
  @Expose()
  @ApiPropertyOptional()
  joinUrl: string;
  @Expose()
  @ApiPropertyOptional()
  status: OrderStatus;
  @Expose()
  @ApiProperty({
    type: UserDto,
  })
  buyer: UserDto;
  @Expose()
  @ApiProperty({
    type: UserDto,
  })
  seller: UserDto;
  @Expose()
  @ApiPropertyOptional()
  eventLink: string;
  @Expose()
  @ApiPropertyOptional()
  startTime: string;
  @Expose()
  @ApiPropertyOptional()
  createdAt: string;
  @Expose()
  @ApiPropertyOptional()
  updatedAt: string;
}
