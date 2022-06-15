import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { UsersService } from '../users/users.service';
import { OrderStatus } from "../enums/order.status";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
  ) {}
  public async findAll(email: string): Promise<Order[] | undefined> {
    return await this.ordersRepository.find();
  }
  public async saveOrder(order): Promise<Order | null> {
    return await this.ordersRepository.save(order);
  }
  public async postOrder(user, orderDto): Promise<Order> {
    const { eventPrice, uuid } = await this.usersService.findByUuid(
      orderDto.mentor_uuid,
    );
    return await this.saveOrder({
      amount: eventPrice,
      eventLink: orderDto.event_link,
      buyer: { uuid: user.uuid },
      seller: { uuid },
    });
  }
  public async putOrder(user, { uuid, status }): Promise<Order> {
    return await this.saveOrder({
      uuid,
      status,
    });
  }
}
