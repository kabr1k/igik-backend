import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { OrderDto } from '../interfaces/order.dto';
import { RedirectDto } from '../interfaces/redirect.dto';

@Controller()
export class StripeCheckoutController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('api/v1/stripe/checkout')
  @ApiTags('Stripe')
  @ApiOperation({
    description: 'Checkout endpoint. Redirects to the payment gateway and back',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Redirect to checkout',
    type: RedirectDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async checkOut(@Request() req, @Body() order: OrderDto) {
    return await this.stripeService.checkOut(req.user.sub, order);
  }
}
