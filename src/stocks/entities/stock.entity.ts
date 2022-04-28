import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import common from '../../common/entity.mixin';
import { Market } from './market.entity';

@Entity()
export class Stock {
  @PrimaryColumn(common.charRequired100)
  // символ биржи (текстовый код)
  symbol: string;
  @Column({ default: true })
  enabled: boolean;
  @Column(common.varcharNullable)
  // название биржи
  name: string;
  @Column(common.varcharNullable)
  // ссылка на прод биржи
  link: string;
  // чего может апиха биржи
  @Column({ nullable: true })
  CORS: boolean;
  @Column({ nullable: true })
  publicAPI: boolean;
  @Column({ nullable: true })
  privateAPI: boolean;
  @Column({ nullable: true })
  cancelOrder: boolean;
  @Column({ nullable: true })
  createDepositAddress: boolean;
  @Column({ nullable: true })
  createOrder: boolean;
  @Column({ nullable: true })
  deposit: boolean;
  @Column({ nullable: true })
  fetchBalance: boolean;
  @Column({ nullable: true })
  fetchClosedOrders: boolean;
  @Column({ nullable: true })
  fetchCurrencies: boolean;
  @Column({ nullable: true })
  fetchDepositAddress: boolean;
  @Column({ nullable: true })
  fetchMarkets: boolean;
  @Column({ nullable: true })
  fetchMyTrades: boolean;
  @Column({ nullable: true })
  fetchOHLCV: boolean;
  @Column({ nullable: true })
  fetchOpenOrders: boolean;
  @Column({ nullable: true })
  fetchOrder: boolean;
  @Column({ nullable: true })
  fetchOrderBook: boolean;
  @Column({ nullable: true })
  fetchOrders: boolean;
  @Column({ nullable: true })
  fetchStatus: string;
  @Column({ nullable: true })
  fetchTicker: boolean;
  @Column({ nullable: true })
  fetchTickers: boolean;
  @Column({ nullable: true })
  fetchBidsAsks: boolean;
  @Column({ nullable: true })
  fetchTrades: boolean;
  @Column({ nullable: true })
  withdraw: boolean;

  @Column(common.textNullable)
  // ошибка, по которой биржа не отдает рынки
  lastError: string;

  @Column('int')
  marketsCount: number;

  @OneToMany(() => Market, (market) => market.stock)
  @JoinColumn()
  markets: Market[];

  disabled?: boolean;
}
