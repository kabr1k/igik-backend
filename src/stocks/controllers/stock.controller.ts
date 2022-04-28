import { Controller, Get, Param, Render } from '@nestjs/common';
import { StocksService } from '../stocks.service';

@Controller()
export class StockController {
  constructor(private readonly stocksService: StocksService) {}
  @Get('stocks')
  @Render('stocks.pug')
  showStocks() {
    return;
  }
  @Get('stocks/:symbol/markets')
  @Render('markets.pug')
  showStockMarkets(@Param('symbol') symbol: string) {
    return;
  }
}
