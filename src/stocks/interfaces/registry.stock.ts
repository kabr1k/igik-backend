import { RegistryMarket } from './registry.market';

export interface RegistryStock {
  disabled?: boolean;
  symbol: string;
  name: string;
  enabled: boolean;
  lastError: string;
  marketsCount: number;
  link: string;
  CORS: boolean;
  publicAPI: boolean;
  privateAPI: boolean;
  cancelOrder: boolean;
  createDepositAddress: boolean;
  createOrder: boolean;
  deposit: boolean;
  fetchBalance: boolean;
  fetchClosedOrders: boolean;
  fetchCurrencies: boolean;
  fetchDepositAddress: boolean;
  fetchMarkets: boolean;
  fetchMyTrades: boolean;
  fetchOHLCV: boolean;
  fetchOpenOrders: boolean;
  fetchOrder: boolean;
  fetchOrderBook: boolean;
  fetchOrders: boolean;
  fetchStatus: string;
  fetchTicker: boolean;
  fetchTickers: boolean;
  fetchBidsAsks: boolean;
  fetchTrades: boolean;
  withdraw: boolean;
  markets?: Record<string, RegistryMarket>;
  ccxt?: any;
}
