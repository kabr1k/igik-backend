import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Ticket } from './ticket.entity';
import { ConfigService } from '@nestjs/config';
import { TicketDto } from './ticket.dto';
import { TicketUpdateDto } from './ticket.update.dto';
@Injectable()
export class TicketsService extends TypeOrmCrudService<Ticket> {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private readonly configService: ConfigService,
  ) {
    super(ticketsRepository);
  }
  public async saveTicket(
    user,
    text,
  ): Promise<Ticket | null> {
    return await this.ticketsRepository.save({
      user,
      text,
    });
  }
}
