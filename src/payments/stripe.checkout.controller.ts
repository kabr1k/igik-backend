import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';
import { StripeOnboardedDto } from "../interfaces/stripe.onboarded.dto";

@Controller()
export class StripeCheckoutController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('stripe/checkout')
  @ApiTags('Stripe')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: StripeOnboardedDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource, access denied',
  })
  @UseGuards(JwtGuard)
  async checkAccount(@Request() req) {

  }
}
