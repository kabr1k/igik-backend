import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}
  public async findAll(email: string): Promise<Order[] | undefined> {
    return await this.ordersRepository.find();
  }
  public async saveOrder(order): Promise<Order | null> {
    return await this.ordersRepository.save(order);
  }
}
