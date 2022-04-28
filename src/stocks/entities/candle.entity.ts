import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Coin } from './coin.entity';
import { Stock } from './stock.entity';
import common from '../../common/entity.mixin';

@Entity()
export class Candle {
  @OneToOne(() => Stock, { primary: true })
  @JoinColumn()
  stock: Stock;
  @OneToOne(() => Coin, { primary: true })
  @JoinColumn()
  base: Coin;
  @OneToOne(() => Coin, { primary: true })
  @JoinColumn()
  quote: Coin;
  @PrimaryColumn('bigint')
  time: number;

  @Column('double precision')
  // OHLC данные за день (дневная свеча)
  open: number;
  @Column('double precision')
  high: number;
  @Column('double precision')
  low: number;
  @Column('double precision')
  close: number;
}
