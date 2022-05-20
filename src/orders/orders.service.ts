import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { UsersService } from '../users/users.service';

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
  public async postOrder(user, orderDto): Promise<void> {
    const { eventPrice, uuid } = await this.usersService.findByUuid(
      orderDto.mentor_uuid,
    );
    await this.saveOrder({
      amount: eventPrice,
      buyer: { uuid: user.uuid },
      seller: { uuid },
    });
  }
}
