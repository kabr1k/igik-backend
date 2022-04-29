import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import common from '../common/entity.mixin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: bigint;
  @Column(common.varcharNullable)
  email: string;
  @Column(common.varcharNullable)
  walletAddress: string;
  @Column({
    nullable: true,
    type: 'bigint',
    default: null,
  })
  nonce: number;
  @Column({ default: true })
  enabled: boolean;
  @Column(common.varcharNullable)
  name: string;
  @Column(common.varcharNullable)
  role: string;
  @Column(common.charRequired256)
  passwordHash: string;
}
