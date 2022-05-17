import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PaymentStatus } from '../enums/payment.status';
import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
  @ManyToOne(() => User, (user) => user.sentPayments)
  sender: User;
  @ManyToOne(() => User, (user) => user.receivedPayments)
  recipient: User;
  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;
}
