import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}
  public async findAll(): Promise<Payment[] | undefined> {
    return await this.paymentsRepository.find();
  }
  public async savePayment(payment): Promise<Payment | null> {
    return await this.paymentsRepository.save(payment);
  }
}
