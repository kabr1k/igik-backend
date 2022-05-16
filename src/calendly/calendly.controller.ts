import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationCodeDto } from '../interfaces/authorization.code.dto';
import { CalendlyService } from './calendly.service';

@Controller()
export class CalendlyController {
  constructor(private readonly calendlyService: CalendlyService) {}
  @Get('calendly')
  @ApiTags('Protected routes')
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
  @Roles('mentor')
  @UseGuards(JwtGuard, RolesGuard)
  async connectCalendly(
    @Query() authorizationCodeDto: AuthorizationCodeDto,
    @Request() req,
  ) {
    await this.calendlyService.connectUser(
      req.user.sub,
      authorizationCodeDto.code,
    );
  }
}
