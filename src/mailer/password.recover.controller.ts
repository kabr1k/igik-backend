import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UpdateProfileDto } from "../interfaces/update.profile.dto";
import { MailerService } from "./mailer.service";
import { RecoverDto } from "../interfaces/recover.dto";
import { ValidationPipe } from "../common/validation.pipe";

@Controller()
export class PasswordRecoverController {
  constructor(private readonly mailerService: MailerService) {}
  @Post('auth/recover')
  @ApiTags('Standard authentication')
  @ApiResponse({
    status: 201,
    description: 'OK, recover message sent',
  })
  @ApiResponse({
    status: 400,
    description: 'Email validation failed',
  })
  async change(@Body(new ValidationPipe()) recoverDto: RecoverDto) {
    await this.mailerService.sendRecoverMessage(recoverDto.email);
  }
}
