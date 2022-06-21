import { Body, Controller, Delete, Post, Put, Request, UseGuards } from "@nestjs/common";
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
import { DeleteOrderDto } from "../interfaces/delete.order.dto";

@Controller()
export class DeleteOrderController {
  constructor(private readonly ordersService: OrdersService) {}
  @Delete('api/v1/order')
  @ApiTags('Orders')
  @ApiOperation({
    description: 'Cancel order',
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
  async postOrder(@Request() req, @Body() orderDto: DeleteOrderDto) {
    return await this.ordersService.cancelOrder(req.user.sub, orderDto);
  }
}
