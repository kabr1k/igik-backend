import {
  Controller,
  Get,
  HttpException,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MailerService } from './mailer.service';
import { UsersService } from '../users/users.service';
import { ConfirmEmailDto } from '../interfaces/confirm.email.dto';

@Controller()
export class ConfirmController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}
  @Get('api/v1/auth/confirm')
  @ApiTags('Standard authentication')
  @ApiOperation({ description: 'Email confirmation endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Email confirmed',
  })
  @ApiResponse({
    status: 401,
    description: 'Token is invalid',
  })
  async confirmEmail(
    @Query() { token, email }: ConfirmEmailDto,
    @Res() response,
  ) {
    if (await this.mailerService.confirm(token, email)) {
      const user = await this.usersService.findByEmail(email);
      await this.usersService.saveUser({
        uuid: user.uuid,
        emailConfirmed: true,
      });
      response.redirect('/?confirmed=true');
    } else {
      throw new HttpException('Token is invalid', 401);
    }
  }
}
