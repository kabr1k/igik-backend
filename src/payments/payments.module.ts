import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeConnectController } from './stripe.connect.controller';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { StripeOnboardedController } from './stripe.onboarded.controller';
import { StripeCheckoutController } from './stripe.checkout.controller';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/order.entity';
import { UsersModule } from "../users/users.module";
import { CalendlyModule } from "../calendly/calendly.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    OrdersModule,
    UsersModule,
    CalendlyModule,
    ConfigModule,
    TypeOrmModule.forFeature([User, Order]),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
  ],
  providers: [
    StripeService,
    UsersService,
    OrdersService,
  ],
  controllers: [
    StripeConnectController,
    StripeOnboardedController,
    StripeCheckoutController,
  ],
  exports: [],
})
export class PaymentsModule {}
