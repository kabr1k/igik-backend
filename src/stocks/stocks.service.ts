import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Repository, getManager } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { Candle } from './entities/candle.entity';
import { Coin } from './entities/coin.entity';
import { ERROR, OK } from '../common/ws.responses';
import { COINS_SAVE_STARTED, COINS_SAVED } from './languages/ru';
import { Market } from './entities/market.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>,
    @InjectRepository(Candle)
    private candlesRepository: Repository<Candle>,
    @InjectRepository(Coin)
    private coinsRepository: Repository<Coin>,
    @InjectRepository(Market)
    private marketsRepository: Repository<Market>,
  ) {}
  async clearStocks(): Promise<string> {
    const entityManager = getManager();
    const answer = await entityManager.query('DELETE FROM `stock`;');
    return OK;
  }
  async clearMarkets(): Promise<string> {
    const entityManager = getManager();
    const answer = await entityManager.query('DELETE FROM `market`;');
    return OK;
  }
  async saveStock(stock: Stock) {
    const strip = {
      ...stock,
    };
    delete strip.markets;
    await this.stocksRepository.save(strip);
    return OK;
  }
  async disableStockBySymbol(symbol: string) {
    await this.stocksRepository.save({
      symbol,
      enabled: false,
    });
    return OK;
  }
  async saveStocks(stocks: Stock[]) {
    const stripped = [];
    for (const stock of stocks) {
      const strip = {
        ...stock,
      };
      delete strip.markets;
      stripped.push(strip);
    }
    await this.stocksRepository.save(stripped);
    return OK;
  }
  async saveMarkets(markets: Market[]) {
    await this.marketsRepository.save(markets);
    return OK;
  }
  async createCoins(): Promise<Coin[]> {
    const coinSymbols: string[] = [];
    const stocks = await this.getStocksFull();
    for (const stock of stocks) {
      for (const market of stock.markets) {
        if (coinSymbols.indexOf(market.base.toUpperCase()) === -1) {
          coinSymbols.push(market.base.toUpperCase());
        } else if (coinSymbols.indexOf(market.quote.toUpperCase()) === -1) {
          coinSymbols.push(market.quote.toUpperCase());
        }
      }
    }
    console.log(coinSymbols);
    const coin = {
      basis: false,
      enabled: true,
      name: '',
    };
    return coinSymbols.map((symbol) => {
      return {
        ...coin,
        symbol,
      };
    });
  }
  async saveCoins(coins) {
    Logger.log(COINS_SAVE_STARTED);
    await this.coinsRepository.save(coins);
    Logger.log(COINS_SAVED);
    return OK;
  }
  async saveCandles(stockCandles) {
    // написать логику выбора лучших свечек из массива всех бирж

    // и сохранить лучшие
    try {
      await this.candlesRepository.save(stockCandles);
      return OK;
    } catch (e) {
      return e.message;
    }
  }
  async getStocksFull(): Promise<Stock[]> {
    const stocks = await this.stocksRepository.find({ relations: ['markets'] });
    return stocks;
  }
  async getStocks(): Promise<Stock[]> {
    const stocks = await this.stocksRepository.find();
    // Populate props for GUI state
    for (const stock of stocks) {
      stock.disabled = false;
    }
    return stocks;
  }
  async getCoins(): Promise<Coin[]> {
    const coins = await this.coinsRepository.find();
    return coins;
  }
  async getMarketsByStock(stock: Stock): Promise<Market[]> {
    return await this.marketsRepository.find({ stock });
  }
  async getMarketsByStockSymbol(symbol: string): Promise<Market[]> {
    return await this.marketsRepository.find({ stock: { symbol } });
  }
}
