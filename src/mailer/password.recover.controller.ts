import { Body, Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UpdateProfileDto } from "../interfaces/update.profile.dto";
import { MailerService } from "./mailer.service";

@Controller()
export class PasswordRecoverController {
  constructor(private readonly mailerService: MailerService) {}
  @Get('auth/recover')
  @ApiTags('Standard authentication')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK, recover message sent',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async change(@Request() req) {
    await this.mailerService.sendRecoverMessage(req.user.sub);
  }
}
