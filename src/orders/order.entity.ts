import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PAYED,
  })
  status: OrderStatus;
  // @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.postedOrders)
  buyer: User;
  // @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.receivedOrders)
  seller: User;
}
