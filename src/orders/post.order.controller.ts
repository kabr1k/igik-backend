import { Body, Controller, HttpException, Post, Request, UseGuards } from "@nestjs/common";
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
  @ApiResponse({
    status: 406,
    description: 'Mentor has not added zoom to his calendly account.',
  })
  @UseGuards(JwtGuard)
  async postOrder(@Request() req, @Body() orderDto: OrderDto) {
    console.log('orderDto', orderDto);
    const response = await this.ordersService.postOrder(req.user.sub, orderDto);
    switch (response) {
      case 406:
        throw new HttpException(
          'Mentor has not added zoom to his calendly account.',
          406,
        );
      default:
        return response;
    }
  }
}
