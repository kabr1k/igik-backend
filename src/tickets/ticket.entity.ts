import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import common from '../common/entity.mixin';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity()
export class Ticket {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  uuid?: number;
  @ApiProperty()
  @Column(common.textNullable)
  topic: string;
  @ApiProperty()
  @Column(common.textNullable)
  text: string;
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.tickets)
  @JoinTable()
  user: User;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;
}
