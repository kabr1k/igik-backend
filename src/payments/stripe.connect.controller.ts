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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { StripeLinkDto } from '../interfaces/stripe.link.dto';

@Controller()
export class StripeConnectController {
  constructor(private readonly stripeService: StripeService) {}
  @Get('stripe/connect')
  @ApiTags('Stripe')
  @ApiOperation({ description: 'Initiate stripe onboarding process' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: StripeLinkDto,
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
  async getAccountLink(@Request() req) {
    return await this.stripeService.getAccountLink(req.user.sub);
  }
}
