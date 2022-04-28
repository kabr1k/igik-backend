import { Injectable, Logger } from '@nestjs/common';
import {
  OK,
  REGISTRY_STATUS_CHANGE,
  STOCK_STATUS_CHANGE,
} from '../common/ws.responses';
import { Coin } from './entities/coin.entity';
import { StocksService } from './stocks.service';
import {
  MARKETS_SAVED,
  MARKETS_START,
  OHLCV_SAVED,
  REGISTRY_READY_1,
  REGISTRY_READY_2,
  REGISTRY_RELOAD_STARTED,
  STOCK_START,
} from './languages/ru';
import { StocksOutgate } from './gateways/stocks.outgate';
import { StocksConnector } from './stocks.connector';
import { Stock } from './entities/stock.entity';
import { Market } from './entities/market.entity';
import { Candle } from './entities/candle.entity';

@Injectable()
export class StocksRegistry {
  public stocks: Stock[];
  constructor(
    private readonly stocksService: StocksService,
    private readonly stocksOutgate: StocksOutgate,
    private readonly stocksConnector: StocksConnector,
  ) {
    this.stocks = [];
  }
  async reloadStock(symbol): Promise<Stock> {
    await this.stocksOutgate.emitStocks(REGISTRY_STATUS_CHANGE, {
      message: symbol + ' ' + MARKETS_START,
    });
    const stock = await this.stocksConnector.readStock(symbol);
    const status = {
      message: '',
      sender: stock.symbol,
      success: false,
      marketsCount: stock.marketsCount,
    };
    if (stock.enabled) {
      try {
        await this.stocksService.saveMarkets(stock.markets);
        status.message = stock.symbol + ' ' + MARKETS_SAVED;
        status.success = true;
      } catch (e) {
        status.message = stock.symbol + ' ' + e.message;
      }
    } else {
      status.message = stock.symbol + ' ' + stock.lastError;
    }
    await this.stocksOutgate.emitStocks(STOCK_STATUS_CHANGE, status);
    return stock;
  }
  async reload(): Promise<string> {
    await this.stocksOutgate.emitStocks(REGISTRY_STATUS_CHANGE, {
      message: REGISTRY_RELOAD_STARTED,
    });
    // чистим таблицы рынков и бирж
    await this.stocksService.clearMarkets();
    await this.stocksService.clearStocks();
    // читаем рынки с API бирж
    const { stocks, successCount, errorCount } =
      await this.stocksConnector.readStocks();
    this.stocks = stocks;
    // сохраняем биржи в БД
    await this.stocksOutgate.emitStocks(REGISTRY_STATUS_CHANGE, {
      message: STOCK_START,
    });
    await this.stocksService.saveStocks(this.stocks);
    for (const stock of this.stocks) {
      await this.reloadStock(stock.symbol);
    }
    await this.stocksOutgate.emitStocks(REGISTRY_STATUS_CHANGE, {
      message: REGISTRY_READY_1 + successCount + REGISTRY_READY_2 + errorCount,
    });
    return OK;
  }
  async loadCandles(date, basisSymbol, limit): Promise<string> {
    const stocks = await this.stocksService.getStocks();
    const coins = await this.stocksService.getCoins();
    const stockCandles = {};
    const quoteBasis = coins.find((coin) => coin.symbol === basisSymbol);
    // проверить получены ли массвы выше и ниже есть дебаггинг процесса в логи
    for (const coin of coins) {
      Logger.log(coin.symbol);
      let stockCount = 0;
      for (const stock of stocks) {
        Logger.log(stock.symbol);
        if (stock.enabled && stock.fetchOHLCV) {
          this.stocksConnector.getCandles(date, stock, coin, quoteBasis).then(
            (candles) => {
              stockCount++;
              Logger.debug(candles.length);
              // положим свечки каждой биржи в массив
              stockCandles[stock.symbol].push(candles);
              if (stockCount === stocks.length) {
                // попытаемся передать все свечки всех бирж
                // по этой монете к выбору лучших и сохранению
                this.stocksService.saveCandles(stockCandles).then((result) => {
                  if (result === OK) {
                    Logger.log(
                      date +
                        ' | ' +
                        stock.name +
                        ' | ' +
                        coin.symbol +
                        ' | ' +
                        OHLCV_SAVED,
                    );
                  } else {
                    Logger.error(
                      date +
                        ' | ' +
                        stock.name +
                        ' | ' +
                        coin.symbol +
                        ' | ' +
                        result,
                    );
                  }
                });
              }
            },
            (error) => {
              stockCount++;
            },
          );
        } else {
          stockCount++;
        }
      }
    }
    return OK;
  }
}
