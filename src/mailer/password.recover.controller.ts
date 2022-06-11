import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MailerService } from './mailer.service';
import { RecoverDto } from '../interfaces/recover.dto';
import { ValidationPipe } from '../common/validation.pipe';

@Controller()
export class PasswordRecoverController {
  constructor(private readonly mailerService: MailerService) {}
  @Post('api/v1/auth/recover')
  @ApiTags('Standard authentication')
  @ApiOperation({ description: 'Send recover password email message' })
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
