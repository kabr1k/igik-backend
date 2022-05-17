import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
@Injectable()
export class StripeService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  private async createAccount(user) {
    return await this.stripe.accounts.create({
      type: 'express',
      email: user.email,
    });
  }
  public async getAccountLink(user): Promise<string | null> {
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
    return accountLink.url;
  }
}
