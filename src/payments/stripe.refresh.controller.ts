import {
  Controller,
  Get,
  Request,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';

@Controller()
export class StripeRefreshController {
  constructor(private readonly stripeService: StripeService) {}
  @Get('stripe/refresh')
  @ApiTags('Stripe')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getAccountLink(@Request() req) {
    return req;
  }
}
