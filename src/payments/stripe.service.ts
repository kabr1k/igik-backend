import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';
import { StripeOnboardedDto } from '../interfaces/stripe.onboarded.dto';
import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import { RedirectDto } from "../interfaces/redirect.dto";
@Injectable()
export class StripeService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
  ) {}
  private async createAccount(user) {
    return await this.stripe.accounts.create({
      type: 'express',
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
  }
  private async getAccount(id) {
    return await this.stripe.accounts.retrieve(id);
  }
  public async getAccountLink(user): Promise<StripeLinkDto | null> {
    const { id } = await this.createAccount(user);
    await this.usersService.saveUser({ uuid: user.uuid, stripeAccount: id });
    const accountLink = await this.stripe.accountLinks.create({
      account: id,
      refresh_url: this.configService.get('STRIPE_REFRESH_URL'),
      return_url: this.configService.get('STRIPE_RETURN_URL'),
      type: 'account_onboarding',
    });
    console.log(user);
    console.log(accountLink);
    return { stripe_link: accountLink.url };
  }
  public async checkAccount(user): Promise<StripeOnboardedDto | null> {
    const { details_submitted } = await this.getAccount(user.stripeAccount);
    await this.usersService.saveUser({
      uuid: user.uuid,
      stripeOnboarded: details_submitted,
    });
    console.log(details_submitted);
    return { onboarded: details_submitted };
  }
  private async createProduct(email) {
    return await this.stripe.products.create({
      name: 'Conversation with ' + email,
    });
  }
  private async createPrice(productUuid, price) {
    return await this.stripe.prices.create({
      unit_amount: price,
      currency: 'gbp',
      product: productUuid,
    });
  }
  public async checkOut(user, orderDto): Promise<RedirectDto> {
    const { eventPrice, stripeAccount, uuid, email } =
      await this.usersService.findByUuid(orderDto.mentor_uuid);
    const { id } = await this.createProduct(email);
    const price = await this.createPrice(id, eventPrice);
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: this.configService.get('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get('STRIPE_FAILURE_URL'),
      payment_intent_data: {
        application_fee_amount: Math.round(
          (eventPrice / 100) *
            this.configService.get('APPLICATION_FEE_PERCENT'),
        ),
        transfer_data: {
          destination: stripeAccount,
        },
      },
    });
    const order = await this.ordersService.saveOrder({
      amount: eventPrice,
      buyer: { uuid: user.uuid },
      seller: { uuid },
    });
    await this.paymentsService.savePayment({
      amount: eventPrice,
      order: { uuid: order.uuid },
      sender: { uuid: user.uuid },
      recipient: { uuid },
    });
    console.log(session);
    return {
      url: session.url,
      statusCode: 303,
    };
  }
}
