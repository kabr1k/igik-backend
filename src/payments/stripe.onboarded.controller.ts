import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';
import { StripeOnboardedDto } from '../interfaces/stripe.onboarded.dto';

@Controller()
export class StripeOnboardedController {
  constructor(private readonly stripeService: StripeService) {}
  @Get('stripe/onboarded')
  @ApiTags('Stripe')
  @ApiOperation({
    description: 'Check if a user has completed stripe onboarding process',
  })
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
  @Roles('mentor')
  @UseGuards(JwtGuard, RolesGuard)
  async checkAccount(@Request() req) {
    return await this.stripeService.checkAccount(req.user.sub);
  }
}
