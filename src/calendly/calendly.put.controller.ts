import { Controller, Get, Put, Query, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationCodeDto } from '../interfaces/authorization.code.dto';
import { CalendlyService } from './calendly.service';
import { CalendlyLinkDto } from "../interfaces/calendly.link.dto";
import { MentorSettingsDto } from "../interfaces/mentor.settings.dto";
import { UsersService } from "../users/users.service";

@Controller()
export class CalendlyPutController {
  constructor(private readonly usersService: UsersService) {}
  @Put('calendly/settings')
  @ApiTags('Calendly')
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
    @Query() mentorSettingsDto: MentorSettingsDto,
    @Request() req,
  ) {
    await this.usersService.saveUser({
      uuid: req.user.sub.uuid,
      calendlyLink: mentorSettingsDto.calendly_link,
      eventPrice: mentorSettingsDto.event_price,
    });
  }
}
