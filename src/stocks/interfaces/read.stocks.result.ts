import { Stock } from '../entities/stock.entity';

export interface ReadStocksResult {
  stocks?: Stock[];
  successCount: number;
  errorCount: number;
}
