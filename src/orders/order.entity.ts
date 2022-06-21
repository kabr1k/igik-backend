import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne, JoinTable, JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import common from "../common/entity.mixin";

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({
    nullable: true,
    type: 'float',
  })
  price: number;
  @ApiProperty()
  @Column({
    nullable: true,
    type: 'int',
  })
  duration: number;
  @ApiProperty()
  @Column(common.varcharNullable)
  joinUrl: string;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.postedOrders)
  buyer: User;
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.receivedOrders)
  seller: User;
  @ApiProperty()
  @Column(common.varcharNullable)
  eventLink: string;
  @ApiProperty()
  @Column('datetime')
  startTime: string;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;
}
