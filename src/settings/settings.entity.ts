import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import common from '../common/entity.mixin';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column(common.varcharNullable)
  contractId: string;
  @ApiProperty()
  @Column('float')
  gas: number;
  @ApiProperty()
  @Column('simple-array')
  list: Record<number, number>;
  @ApiProperty()
  @Column('int')
  max: number;
  @ApiProperty()
  @Column('int')
  tokensTotal: number;
  @ApiProperty()
  @Column('float')
  tokenPrice: number;
  @ApiProperty()
  @Column('datetime')
  preSaleDate: Date;
  @ApiProperty()
  @Column('datetime')
  saleDate: Date;
  @ApiProperty()
  @Column(common.varcharNullable)
  apiUrl: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  userAssetsCommand: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  txStatusCommand: string;
}
