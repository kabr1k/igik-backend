export interface RegistryMarket {
  symbol: string;
  enabled: boolean;
  id?: string; // string literal for referencing within an exchange
  base?: string; // uppercase string, unified base currency code, 3 or more letters
  quote?: string; // uppercase string, unified quote currency code, 3 or more letters
  baseId?: string; // any string, exchange-specific base currency id
  quoteId?: string; // any string, exchange-specific quote currency id
  active?: boolean; // boolean, market status
  type?: string; // spot for spot, future for expiry futures, swap for perpetual swaps, 'option' for options
  spot?: boolean; // whether the market is a spot market
  margin?: boolean; // whether the market is a margin market
  future?: boolean; // whether the market is a expiring future
  swap?: boolean; // whether the market is a perpetual swap
  option?: boolean; // whether the market is an option contract
  contract?: boolean; // whether the market is a future, a perpetual swap, or an option
  settle?: string; // the unified currency code that the contract will settle in, only set if `contract` is boolean
  settleId?: string; // the currencyId of that the contract will settle in, only set if `contract` is boolean
  contractSize?: number; // the size of one contract, only used if `contract` is boolean
  linear?: boolean; // the contract is a linear contract (settled in quote currency)
  inverse?: boolean; // the contract is an inverse contract (settled in base currency)
  expiry?: bigint; // the unix expiry timestamp in milliseconds, undefined for everything except market['type'] `future`
  expiryDatetime?: string; // The datetime contract will in iso8601 format
  strike?: number; // price at which a put or call option can be exercised
  optionType?: 'call' | 'put'; // call or put string, call option represents an option with the right to buy and put an option with the right to sell
  taker?: number; // taker fee rate, 0.002 = 0.2%
  maker?: number; // maker fee rate, 0.0016 = 0.16%
  percentage?: boolean; // whether the taker and maker fee rate is a multiplier or a fixed flat amount
  tierBased?: boolean; // whether the fee depends on your trading tier (your trading volume)
  feeSide?: 'get' | 'give' | 'base' | 'quote' | 'other'; // string literal can be 'get', 'give', 'base', 'quote', 'other'
  precision?: {
    // number of decimal digits "after the dot"
    price?: number; // integer or float for TICK_SIZE roundingMode, might be missing if not supplied by the exchange
    amount?: number; // integer, might be missing if not supplied by the exchange
    cost?: number; // integer, very few exchanges actually have it
  };
  limits?: {
    // value limits when placing orders on this market
    amount?: {
      min?: number; // order amount should be > min
      max?: number; // order amount should be < max
    };
    price?: {
      min?: number;
      max?: number;
    }; // same min/max limits for the price of the order
    cost?: {
      min?: number;
      max?: number;
    }; // same limits for order cost = price * amount
    leverage?: {
      min?: number;
      max?: number;
    }; // same min/max limits for the leverage of the order
  };
  info?: any; // the original unparsed market info from the exchange
}
