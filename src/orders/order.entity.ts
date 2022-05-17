import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';
import { Payment } from '../payments/payment.entity';

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
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @ManyToOne(() => User, (user) => user.postedOrders)
  buyer: User;
  @ManyToOne(() => User, (user) => user.receivedOrders)
  seller: User;
  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
