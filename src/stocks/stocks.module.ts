import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { StocksConnector } from './stocks.connector';
import { StockController } from './controllers/stock.controller';
import { StocksOutgate } from './gateways/stocks.outgate';
import { Stock } from './entities/stock.entity';
import { Candle } from './entities/candle.entity';
import { Coin } from './entities/coin.entity';
import { StocksIngate } from './gateways/stocks.ingate';
import { StocksRegistry } from './stocks.registry';
import { Market } from './entities/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Coin, Candle, Market])],
  controllers: [StockController],
  providers: [
    StocksOutgate,
    StocksIngate,
    StocksService,
    StocksConnector,
    StocksRegistry,
  ],
})
export class StocksModule {
  private connection: Connection;
}
