import { Body, Controller, Post, Put, Request, UseGuards } from "@nestjs/common";
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
import { PutOrderDto } from "../interfaces/put.order.dto";

@Controller()
export class PutOrderController {
  constructor(private readonly ordersService: OrdersService) {}
  @Put('api/v1/order')
  @ApiTags('Orders')
  @ApiOperation({
    description: 'Change order status. Invoke after successful payment',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async postOrder(@Request() req, @Body() orderDto: PutOrderDto) {
    return await this.ordersService.putOrder(req.user.sub, orderDto);
  }
}
