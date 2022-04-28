import { WebSocketGateway } from '@nestjs/websockets';
import { OK } from '../../common/ws.responses';
import { Socket } from 'net';
import { StatusDto } from '../interfaces/status.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class StocksOutgate {
  public stocksSubscribers: Socket[];
  public marketsSubscribers: Socket[];
  constructor() {
    this.stocksSubscribers = [];
    this.marketsSubscribers = [];
  }
  public async emitStocks(code: string, status: StatusDto): Promise<string> {
    for (const id in this.stocksSubscribers) {
      this.stocksSubscribers[id].emit(code, status);
    }
    Logger.log(status.message);
    return OK;
  }
}
