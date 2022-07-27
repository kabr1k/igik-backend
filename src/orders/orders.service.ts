import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Order } from './order.entity';
import { UsersService } from '../users/users.service';
import { OrderStatus } from '../enums/order.status';
import { User } from '../users/user.entity';
import { CalendlyService } from '../calendly/calendly.service';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly calendlyService: CalendlyService,
  ) {
    super(ordersRepository);
  }
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
  public async postOrder(user, orderDto): Promise<Order | 406> {
    const mentor = await this.usersService.findByUuid(orderDto.mentor_uuid);
    const response = await this.calendlyService.getTokenByRefresh(
      mentor.calendlyRefreshToken,
      mentor,
    );
    const calendlyEvents = await this.calendlyService.getCalendlyEvents(
      response.access_token,
      mentor,
    );
    const event = calendlyEvents.collection.find(
      (event) => event.uri === orderDto.event_link,
    );
    const startTime = event.start_time;
    const joinUrl = event.location.join_url;
    if (!joinUrl) {
      const cancelResponse = await this.calendlyService.cancelEvent(
        mentor.uuid,
        orderDto.event_link,
        'No zoom integration. Please connect zoom to your calendly account',
      );
      console.log(cancelResponse);
      return 406;
    }
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
      joinUrl,
    });
  }
  public async putOrder(user, { id, status }): Promise<Order> {
    return await this.saveOrder({
      id,
      status,
    });
  }
  public async cancelOrder(user, { id, status, reason }): Promise<Order | 404> {
    const order = await this.findById(id);
    if (!order) {
      return 404;
    }
    const mentorUuid = order.seller.uuid;
    const eventLink = order.eventLink;
    const cancelResponse = await this.calendlyService.cancelEvent(
      mentorUuid,
      eventLink,
      reason,
    );
    console.log(cancelResponse);
    return await this.saveOrder({
      id,
      status,
    });
  }
}
