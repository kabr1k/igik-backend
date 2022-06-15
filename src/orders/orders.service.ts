import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Order } from './order.entity';
import { UsersService } from '../users/users.service';
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';
import { CalendlyService } from '../calendly/calendly.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly calendlyService: CalendlyService,
  ) {}
  public async findAll(): Promise<Order[] | undefined> {
    return await this.ordersRepository.find();
  }
  public async findById(id: number): Promise<Order | undefined> {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Order)
      .createQueryBuilder('order')
      .where('order.id = :id', { id })
      .leftJoinAndSelect('order.buyer', 'buyer')
      .leftJoinAndSelect('order.seller', 'seller')
      .getOne();
  }
  public async saveOrder(order): Promise<Order | null> {
    return await this.ordersRepository.save(order);
  }
  public async postOrder(user, orderDto): Promise<Order> {
    const mentor = await this.usersService.findByUuid(orderDto.mentor_uuid);
    const response = await this.calendlyService.getTokenByRefresh(
      mentor.calendlyRefreshToken,
      mentor,
    );
    const calendlyEvents = await this.calendlyService.getCalendlyEvents(
      response.access_token,
      mentor,
    );
    const startTime = calendlyEvents.collection.find(
      (event) => event.uri === orderDto.event_link,
    ).start_time;
    const calendlyEventTypes = await this.calendlyService.getCalendlyEventTypes(
      response.access_token,
      mentor,
    );
    const duration = calendlyEventTypes.collection.find(
      (event) => event.scheduling_url === mentor.calendlyLink,
    ).duration;
    return await this.saveOrder({
      price: mentor.eventPrice,
      eventLink: orderDto.event_link,
      buyer: { uuid: user.uuid },
      seller: { uuid: mentor.uuid },
      duration,
      startTime,
    });
  }
  public async putOrder(user, { id, status }): Promise<Order> {
    return await this.saveOrder({
      id,
      status,
    });
  }
}
