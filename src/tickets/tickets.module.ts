import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TicketController } from './ticket.controller';
import { CreateTicketController } from './create.ticket.controller';
import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MailerModule,
    ConfigModule,
    TypeOrmModule.forFeature([Ticket]),
  ],
  providers: [TicketsService, ConfigService],
  controllers: [TicketController, CreateTicketController],
  exports: [TicketsService],
})
export class TicketsModule {}
