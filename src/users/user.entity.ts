import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import common from '../common/entity.mixin';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
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
  @Column({ default: false })
  whitelist: boolean;
  @Column(common.varcharNullable)
  name: string;
  @Column(common.varcharNullable)
  role: string;
  @Exclude()
  @Column(common.varcharNullable)
  passwordHash: string;
  @Column(common.varcharNullable)
  calendlyLink: string;
  @Column(common.varcharNullable)
  calendlyRefreshToken: string;
}
