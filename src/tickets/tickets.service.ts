import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Ticket } from './ticket.entity';
import { ConfigService } from '@nestjs/config';
import { TicketDto } from './ticket.dto';
import { TicketUpdateDto } from './ticket.update.dto';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from "../users/users.service";
@Injectable()
export class TicketsService extends TypeOrmCrudService<Ticket> {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {
    super(ticketsRepository);
  }
  public async saveTicket(dto): Promise<Ticket | null> {
    const user = await this.usersService.findByEmail(dto.email);
    await this.mailerService.sendTicket(user, dto);
    return await this.ticketsRepository.save({
      user,
      text: dto.text,
      topic: dto.topic,
    });
  }
}
