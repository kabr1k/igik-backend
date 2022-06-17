import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';
import { StripeOnboardedDto } from '../interfaces/stripe.onboarded.dto';
import { RedirectDto } from '../interfaces/redirect.dto';
import { OrdersService } from '../orders/orders.service';
@Injectable()
export class StripeService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
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
    let { stripeAccount } = await this.usersService.findByUuid(user.uuid);
    if (!stripeAccount) {
      const { id } = await this.createAccount(user);
      stripeAccount = id;
      await this.usersService.saveUser({ uuid: user.uuid, stripeAccount });
    }
    const accountLink = await this.stripe.accountLinks.create({
      account: stripeAccount,
      refresh_url: this.configService.get('STRIPE_REFRESH_URL'),
      return_url: this.configService.get('STRIPE_RETURN_URL'),
      type: 'account_onboarding',
    });
    return { stripe_link: accountLink.url };
  }
  public async checkAccount({ uuid }): Promise<StripeOnboardedDto | null> {
    const user = await this.usersService.findByUuid(uuid);
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
      currency: 'usd',
      product: productUuid,
    });
  }
  public async checkOut(user, { order_id }): Promise<RedirectDto> {
    const order = await this.ordersService.findById(order_id);
    let priceId;
    const mentor = order.seller;
    if (!mentor.stripeProductId) {
      const product = await this.createProduct(mentor.email);
      const price = await this.createPrice(product.id, mentor.eventPrice * 100);
      priceId = price.id;
      await this.usersService.saveUser({
        uuid: mentor.uuid,
        stripeProductId: product.id,
        stripePriceId: price.id,
      });
    } else {
      priceId = mentor.stripePriceId;
    }
    // const order = await this.ordersService.postOrder(user, orderDto);
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:
        this.configService.get('STRIPE_SUCCESS_URL') +
        '?mentor_uuid=' +
        mentor.uuid,
      cancel_url:
        this.configService.get('STRIPE_FAILURE_URL') +
        '?mentor_uuid=' +
        mentor.uuid,
      // payment_intent_data: {
      //   application_fee_amount: Math.round(
      //     (mentor.eventPrice / 100) *
      //       this.configService.get('APPLICATION_FEE_PERCENT'),
      //   ),
      //   transfer_data: {
      //     destination: mentor.stripeAccount,
      //   },
      // },
    });
    console.log(session);
    return {
      checkout_url: session.url,
    };
  }
}
