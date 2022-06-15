import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StripeOnboardedDto } from '../interfaces/stripe.onboarded.dto';
import { OrderDto } from '../interfaces/order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class PostOrderController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('api/v1/order')
  @ApiTags('Orders')
  @ApiOperation({
    description: 'Post order. Invoked after successful calendly booking',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async postOrder(@Request() req, @Body() orderDto: OrderDto) {
    return await this.ordersService.postOrder(req.user.sub, orderDto);
  }
}
