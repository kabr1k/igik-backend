import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import common from '../common/entity.mixin';
import { Order } from '../orders/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Speciality } from '../speciality/speciality.entity';
import { Category } from '../category/category.entity';
import { Location } from '../location/location.entity';
import { Language } from '../languages/language.entity';
import { Experience } from '../experience/experience.entity';

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
  active: boolean;
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
  @Exclude()
  @Column(common.varcharNullable)
  passwordHash: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  calendlyLink: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  calendlyRefreshToken: string;
  @ApiProperty({ type: [Order] })
  @OneToMany(() => Order, (order) => order.buyer)
  postedOrders: Order[];
  @ApiProperty({ type: [Order] })
  @OneToMany(() => Order, (order) => order.seller)
  receivedOrders: Order[];
  @ApiProperty({ type: [Speciality] })
  @ManyToMany(() => Speciality, (speciality) => speciality.users)
  @JoinTable()
  specialities: Speciality[];
  @ApiProperty({ type: [Category] })
  @ManyToMany(() => Category, (category) => category.users)
  @JoinTable()
  categories: Category[];
  @ApiProperty()
  @ManyToOne(() => Language, (language) => language.users)
  @JoinTable()
  language: Language;
  @ApiProperty()
  @ManyToOne(() => Location, (location) => location.users)
  @JoinTable()
  location: Location;
  @ApiProperty()
  @ManyToOne(() => Experience, (experience) => experience.users)
  @JoinTable()
  experience: Experience;
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
  @Column({
    nullable: true,
    type: 'int',
    default: 0,
  })
  timezone: number;
  @ApiProperty()
  @Column(common.varcharNullable)
  socialNetwork1: string;
  @ApiProperty()
  @ApiProperty()
  @Column(common.varcharNullable)
  socialNetwork2: string;
  @ApiProperty()
  @ApiProperty()
  @Column(common.varcharNullable)
  socialNetwork3: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  about: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  socialNetworks: string;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;
}
