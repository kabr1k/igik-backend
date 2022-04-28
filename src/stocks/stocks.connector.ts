// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Coin } from './entities/coin.entity';

const ccxt = require('ccxt');

import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';
import {
  MARKETS_SAVED,
  STOCK_ERROR,
  STOCK_OK,
  STOCK_START,
} from './languages/ru';
import { ReadStocksResult } from './interfaces/read.stocks.result';
import { StocksOutgate } from './gateways/stocks.outgate';
import { Injectable, Logger } from '@nestjs/common';
import { Candle } from './entities/candle.entity';
import { Market } from './entities/market.entity';
import {
  ERROR,
  OK,
  REGISTRY_STATUS_CHANGE,
  STOCK_STATUS_CHANGE,
} from '../common/ws.responses';

@Injectable()
export class StocksConnector {
  constructor(private readonly stocksOutgate: StocksOutgate) {}
  rateLimit(stock: Stock) {
    return ccxt[stock.symbol].rateLimit;
  }
  async getCandles(
    date,
    stock: Stock,
    base: Coin,
    quote: Coin,
  ): Promise<Candle[]> {
    const prices: Candle[] = [];
    let result;
    try {
      result = await ccxt[stock.symbol].fetchOHLCV(
        base.symbol + '/' + quote.symbol,
        '1d',
        date.getTime(),
      );
      for (const price of result) {
        prices.push({
          stock,
          base,
          quote,
          time: price[0],
          open: price[1],
          high: price[2],
          low: price[3],
          close: price[4],
        });
      }
      Logger.debug(stock.symbol+' | '+base.symbol);
      return prices;
    } catch (e) {
      return e.message;
    }
  }
  async readStocks(): Promise<ReadStocksResult> {
    return new Promise((resolve, reject) => {
      const stocks: Stock[] = [];
      const readResult: ReadStocksResult = {
        successCount: 0,
        errorCount: 0,
      };
      this.stocksOutgate.emitStocks(REGISTRY_STATUS_CHANGE, {
        message: STOCK_START,
      });
      for (const symbol of ccxt.exchanges) {
        this.readStock(symbol).then((stock) => {
          const status = {
            message: '',
            sender: symbol,
            success: false,
            marketsCount: 0,
          };
          if (stock.enabled) {
            readResult.successCount++;
            status.marketsCount = stock.marketsCount;
            status.message = stock.symbol + ' ' + STOCK_OK;
          } else {
            readResult.errorCount++;
            status.message = stock.symbol + ' ' + STOCK_ERROR;
          }
          this.stocksOutgate.emitStocks(STOCK_STATUS_CHANGE, status);
          stocks.push(stock);
          if (
            readResult.successCount + readResult.errorCount ===
            ccxt.exchanges.length
          ) {
            resolve({
              stocks,
              ...readResult,
            });
          }
        });
      }
    });
  }
  async readStock(symbol: string): Promise<Stock> {
    return new Promise((resolve, reject) => {
      const exchange = new ccxt[symbol]();
      const stock: Stock = {
        enabled: true,
        lastError: '',
        marketsCount: 0,
        name: exchange.name,
        symbol: exchange.id,
        link: exchange.urls.www,
        CORS: exchange.has.CORS,
        publicAPI: exchange.has.publicAPI,
        privateAPI: exchange.has.privateAPI,
        cancelOrder: exchange.has.cancelOrder,
        createDepositAddress: exchange.has.createDepositAddress,
        createOrder: exchange.has.createOrder,
        deposit: exchange.has.deposit,
        fetchBalance: exchange.has.fetchBalance,
        fetchClosedOrders: exchange.has.fetchClosedOrders,
        fetchCurrencies: exchange.has.fetchCurrencies,
        fetchDepositAddress: exchange.has.fetchDepositAddress,
        fetchMarkets: exchange.has.fetchMarkets,
        fetchMyTrades: exchange.has.fetchMyTrades,
        fetchOHLCV: exchange.has.fetchOHLCV,
        fetchOpenOrders: exchange.has.fetchOpenOrders,
        fetchOrder: exchange.has.fetchOrder,
        fetchOrderBook: exchange.has.fetchOrderBook,
        fetchOrders: exchange.has.fetchOrders,
        fetchStatus: exchange.has.fetchStatus,
        fetchTicker: exchange.has.fetchTicker,
        fetchTickers: exchange.has.fetchTickers,
        fetchBidsAsks: exchange.has.fetchBidsAsks,
        fetchTrades: exchange.has.fetchTrades,
        withdraw: exchange.has.withdraw,
        markets: [],
      };
      exchange.loadMarkets().then(
        (result) => {
          for (const key in result) {
            // skip the indicies starting with .XXX
            if (key[0] !== '.') {
              let pricePrecision = null,
                amountPrecision = null,
                costPrecision = null,
                minAmount = null,
                maxAmount = null,
                minPrice = null,
                maxPrice = null,
                minCost = null,
                maxCost = null,
                minLeverage = null,
                maxLeverage = null;
              if (result[key].precision) {
                pricePrecision = result[key].precision.price;
                amountPrecision = result[key].precision.amount;
                costPrecision = result[key].precision.cost;
              }
              if (result[key].limits) {
                if (result[key].limits.amount) {
                  minAmount = result[key].limits.amount.min;
                  maxAmount = result[key].limits.amount.min;
                }
                if (result[key].limits.price) {
                  minPrice = result[key].limits.price.min;
                  maxPrice = result[key].limits.price.max;
                }
                if (result[key].limits.cost) {
                  minCost = result[key].limits.cost.min;
                  maxCost = result[key].limits.cost.max;
                }
                if (result[key].limits.leverage) {
                  minLeverage = result[key].limits.leverage.min;
                  maxLeverage = result[key].limits.leverage.max;
                }
              }
              delete result[key].precision;
              delete result[key].limits;
              result[key].info = JSON.stringify(result[key].info);
              stock.marketsCount++;
              stock.markets.push({
                ...result[key],
                stock,
                enabled: true,
                pricePrecision,
                amountPrecision,
                costPrecision,
                minAmount,
                maxAmount,
                minPrice,
                maxPrice,
                minCost,
                maxCost,
                minLeverage,
                maxLeverage,
              });
            }
          }
          resolve(stock);
        },
        (readError) => {
          stock.lastError = readError.message.substr(0, 1024);
          stock.enabled = false;
          resolve(stock);
        },
      );
    });
  }
}
