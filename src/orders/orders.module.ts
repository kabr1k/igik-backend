import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { PostOrderController } from './post.order.controller';
import { PaymentsModule } from '../payments/payments.module';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { CalendlyModule } from '../calendly/calendly.module';
import { PutOrderController } from './put.order.controller';
import { DeleteOrderController } from './delete.order.controller';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => PaymentsModule),
    TypeOrmModule.forFeature([Order, User]),
    UsersModule,
    CalendlyModule,
  ],
  providers: [OrdersService, UsersService],
  controllers: [PostOrderController, PutOrderController, DeleteOrderController],
  exports: [OrdersService],
})
export class OrdersModule {}
