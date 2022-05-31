import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizationCodeDto } from '../interfaces/authorization.code.dto';
import { CalendlyService } from './calendly.service';
import { CalendlyLinkDto } from '../interfaces/calendly.link.dto';

@Controller()
export class CalendlyConnectController {
  constructor(private readonly calendlyService: CalendlyService) {}
  @Get('calendly/connect')
  @ApiTags('Calendly')
  @ApiOperation({ description: "Connect mentor's calendly account" })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: CalendlyLinkDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Something is wrong with the request',
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
  async connectCalendly(
    @Query() authorizationCodeDto: AuthorizationCodeDto,
    @Request() req,
  ) {
    return await this.calendlyService.connectUser(
      req.user.sub,
      authorizationCodeDto.code,
    );
  }
}
