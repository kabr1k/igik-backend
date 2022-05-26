import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { PaymentsModule } from '../payments/payments.module';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PaymentsModule,
    TypeOrmModule.forFeature([Order, User]),
  ],
  providers: [OrdersService, UsersService],
  controllers: [OrderController],
  exports: [OrdersService],
})
export class OrdersModule {}
