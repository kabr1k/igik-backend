import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Exclude } from 'class-transformer';
import common from '../common/entity.mixin';
import { Order } from '../orders/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Speciality } from "../speciality/speciality.entity";

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  email: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  walletAddress: string;
  @ApiProperty()
  @Column({
    nullable: true,
    type: 'bigint',
    default: null,
  })
  nonce: number;
  @ApiProperty()
  @Column({ default: false })
  enabled: boolean;
  @ApiProperty()
  @Column(common.varcharNullable)
  firstName: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  lastName: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  role: string;
  @Column(common.varcharNullable)
  passwordHash: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  calendlyLink: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  calendlyRefreshToken: string;
  @ApiProperty()
  @OneToMany(() => Order, (order) => order.buyer)
  postedOrders: Order[];
  @ApiProperty()
  @OneToMany(() => Order, (order) => order.seller)
  receivedOrders: Order[];
  @ApiProperty()
  @ManyToMany(() => Speciality, (speciality) => speciality.users)
  @JoinTable()
  specialities: Speciality[];
  @ApiProperty()
  @Column(common.varcharNullable)
  stripeAccount: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  stripeProductId: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  stripePriceId: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  avatarS: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  avatarM: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  avatarL: string;
  @ApiProperty()
  @Column({ default: false })
  stripeOnboarded: boolean;
  @ApiProperty()
  @Column({ default: false })
  emailConfirmed: boolean;
  @ApiProperty()
  @Column({
    nullable: true,
    type: 'int',
    default: 0,
  })
  eventPrice: number;
  @ApiProperty()
  @Column(common.varcharNullable)
  phone: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
