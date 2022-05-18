import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeConnectController } from './stripe.connect.controller';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { StripeRefreshController } from './stripe.refresh.controller';
import { StripeReturnController } from './stripe.return.controller';
import { StripeOnboardedController } from './stripe.onboarded.controller';
import { StripeCheckoutController } from './stripe.checkout.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Payment, User]),
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
  ],
  providers: [PaymentsService, StripeService, UsersService],
  controllers: [
    StripeConnectController,
    StripeOnboardedController,
    StripeCheckoutController,
    StripeReturnController,
    StripeRefreshController,
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
