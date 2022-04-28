import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ERROR, OK } from '../../common/ws.responses';
import { StocksService } from '../stocks.service';
import { StocksRegistry } from '../stocks.registry';
import { StocksOutgate } from './stocks.outgate';
import { Stock } from '../entities/stock.entity';
import { RegistryMarket } from '../interfaces/registry.market';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class StocksIngate {
  constructor(
    private readonly stocksService: StocksService,
    private readonly stocksOutgate: StocksOutgate,
    private readonly stocksRegistry: StocksRegistry,
  ) {}
  @SubscribeMessage('getStocks')
  async getStocks(@MessageBody() data): Promise<Stock[]> {
    return await this.stocksService.getStocks();
  }
  @SubscribeMessage('getMarkets')
  async getMarkets(@MessageBody() symbol): Promise<RegistryMarket[]> {
    return await this.stocksService.getMarketsByStockSymbol(symbol);
  }
  @SubscribeMessage('enableStock')
  async enableStock(@MessageBody() symbol): Promise<string> {
    Logger.debug(symbol);
    const stock = await this.stocksRegistry.reloadStock(symbol);
    await this.stocksService.saveStock(stock);
    return stock.enabled ? OK : ERROR;
  }
  @SubscribeMessage('disableStock')
  async disableStock(@MessageBody() symbol): Promise<string> {
    await this.stocksService.disableStockBySymbol(symbol);
    Logger.debug(symbol);
    return OK;
  }
  @SubscribeMessage('reloadRegistry')
  async reloadRegistry(@MessageBody() data): Promise<string> {
    await this.stocksRegistry.reload();
    return OK;
  }
  @SubscribeMessage('getCandles')
  async getCandles(@MessageBody() data): Promise<string> {
    Logger.debug('candles');
    const quoteBasis = 'BTC';
    const date = new Date('2022-01-01');
    const limit = '365';
    await this.stocksRegistry.loadCandles(date, quoteBasis, limit);
    return OK;
  }
  @SubscribeMessage('createCoins')
  async createCoins(@MessageBody() data): Promise<string> {
    const coins = await this.stocksService.createCoins();
    await this.stocksService.saveCoins(coins);
    return OK;
  }
  @SubscribeMessage('subscribeStocks')
  async stocksStatusChange(@ConnectedSocket() client: any): Promise<string> {
    this.stocksOutgate.stocksSubscribers[client.id] = client;
    Logger.debug('subscribe stocks');
    client.conn.on('close', () => {
      delete this.stocksOutgate.stocksSubscribers[client.id];
    });
    return OK;
  }
  @SubscribeMessage('subscribeMarkets')
  async marketsStatusChange(@ConnectedSocket() client: any): Promise<string> {
    this.stocksOutgate.marketsSubscribers[client.id] = client;
    Logger.debug('subscribe markets');
    client.conn.on('close', () => {
      delete this.stocksOutgate.marketsSubscribers[client.id];
    });
    return OK;
  }
}
