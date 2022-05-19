import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';
import { StripeOnboardedDto } from '../interfaces/stripe.onboarded.dto';
@Injectable()
export class StripeService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  private async createProduct(user) {
    return await this.stripe.products.create({
      name: user.email,
    });
  }
  private async createPrice(productUuid, price) {
    return await this.stripe.prices.create({
      unit_amount: price,
      currency: 'usd',
      product: productUuid,
    });
  }
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
  public async checkOut(user, order): Promise<void> {
    console.log(order);
    const { id } = await this.createProduct(user);
    console.log(id);
    const { eventPrice, stripeAccount } = await this.usersService.findByUuid(
      order.mentor_uuid,
    );
    const price = await this.createPrice(id, eventPrice);
    console.log(eventPrice);
    console.log(price);

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

    console.log(session);
    // 303 redirect to session.url
  }
}
