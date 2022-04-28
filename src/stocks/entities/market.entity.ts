import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import common from '../../common/entity.mixin';
import { Stock } from './stock.entity';

@Entity()
export class Market {
  @PrimaryColumn(common.charRequired100)
  symbol: string;
  @Column({ default: true })
  enabled: boolean;
  @Column(common.varcharNullable)
  id: string; // string literal for referencing within an exchange
  @Column(common.varcharNullable)
  base: string; // uppercase string, unified base currency code, 3 or more letters
  @Column(common.varcharNullable)
  quote: string; // uppercase string, unified quote currency code, 3 or more letters
  @Column(common.varcharNullable)
  baseId: string; // any string, exchange-specific base currency id
  @Column(common.varcharNullable)
  quoteId: string; // any string, exchange-specific quote currency id
  @Column({ nullable: true })
  active: boolean; // boolean, market status
  @Column(common.varcharNullable)
  type: string; // spot for spot, future for expiry futures, swap for perpetual swaps, 'option' for options
  @Column({ nullable: true })
  spot: boolean; // whether the market is a spot market
  @Column({ nullable: true })
  margin: boolean; // whether the market is a margin market
  @Column({ nullable: true })
  future: boolean; // whether the market is a expiring future
  @Column({ nullable: true })
  swap: boolean; // whether the market is a perpetual swap
  @Column({ nullable: true })
  option: boolean; // whether the market is an option contract
  @Column({ nullable: true })
  contract: boolean; // whether the market is a future, a perpetual swap, or an option
  @Column(common.varcharNullable)
  settle: string; // the unified currency code that the contract will settle in, only set if `contract` is boolean
  @Column(common.varcharNullable)
  settleId: string; // the currencyId of that the contract will settle in, only set if `contract` is boolean
  @Column({ type: 'double precision', nullable: true })
  contractSize: number; // the size of one contract, only used if `contract` is boolean
  @Column({ nullable: true })
  linear: boolean; // the contract is a linear contract (settled in quote currency)
  @Column({ nullable: true })
  inverse: boolean; // the contract is an inverse contract (settled in base currency)
  @Column({ type: 'bigint', nullable: true })
  expiry: bigint; // the unix expiry timestamp in milliseconds, undefined for everything except market['type'] `future`
  @Column(common.varcharNullable)
  expiryDatetime: string; // The datetime contract will in iso8601 format
  strike: number; // price at which a put or call option can be exercised
  @Column(common.varcharNullable)
  optionType: 'call' | 'put'; // call or put string, call option represents an option with the right to buy and put an option with the right to sell
  @Column({ type: 'float', nullable: true })
  taker: number; // taker fee rate, 0.002 = 0.2%
  @Column({ type: 'float', nullable: true })
  maker: number; // maker fee rate, 0.0016 = 0.16%
  @Column({ nullable: true })
  percentage: boolean; // whether the taker and maker fee rate is a multiplier or a fixed flat amount
  @Column({ nullable: true })
  tierBased: boolean; // whether the fee depends on your trading tier (your trading volume)
  @Column(common.varcharNullable)
  feeSide: 'get' | 'give' | 'base' | 'quote' | 'other'; // string literal can be 'get', 'give', 'base', 'quote', 'other'
  @Column({ type: 'int', nullable: true })
  pricePrecision: number; // integer or float for TICK_SIZE roundingMode, might be missing if not supplied by the exchange
  @Column({ type: 'int', nullable: true })
  amountPrecision: number; // integer, might be missing if not supplied by the exchange
  @Column({ type: 'int', nullable: true })
  costPrecision: number; // integer, very few exchanges actually have it
  @Column({ type: 'double precision', nullable: true })
  minAmount: number; // order amount should be > min
  @Column({ type: 'double precision', nullable: true })
  maxAmount: number; // order amount should be < max
  @Column({ type: 'double precision', nullable: true })
  minPrice: number;
  @Column({ type: 'double precision', nullable: true })
  maxPrice: number;
  @Column({ type: 'double precision', nullable: true })
  minCost: number;
  @Column({ type: 'double precision', nullable: true })
  maxCost: number;
  @Column({ type: 'float', nullable: true })
  minLeverage: number;
  @Column({ type: 'float', nullable: true })
  maxLeverage: number;
  @Column(common.textNullable)
  info: string; // the original unparsed market info from the exchange

  @ManyToOne(() => Stock, (stock) => stock.markets)
  stock: Stock;
}
