import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PAYED,
  })
  status: OrderStatus;
  @ManyToOne(() => User, (user) => user.postedOrders)
  buyer: User;
  @ManyToOne(() => User, (user) => user.receivedOrders)
  seller: User;
}
