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
import { CalendlyCancelDto } from '../interfaces/calendly.cancel.dto';

@Controller()
export class CalendlyCancelController {
  constructor(private readonly calendlyService: CalendlyService) {}
  @Get('api/v1/calendly/cancel')
  @ApiTags('Calendly')
  @ApiOperation({ description: 'Cancel booking' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
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
  @UseGuards(JwtGuard)
  async connectCalendly(@Query() cancelDto: CalendlyCancelDto) {
    return await this.calendlyService.cancelEvent(
      cancelDto.mentor_uuid,
      cancelDto.event_link,
    );
  }
}
