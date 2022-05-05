import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from '../guards/local.guard';
import { LoginUserDto } from '../../interfaces/login.user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { LoginService } from './login.service';
import { ValidationPipe } from '../metamask/validation.pipe';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('auth/login')
  @ApiTags('Standard authentication')
  @ApiResponse({
    status: 200,
    description: 'User has been logged in',
    type: JwtDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @HttpCode(200)
  @UseGuards(LocalGuard)
  async login(
    @Request() req,
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ) {
    return this.loginService.login(req.user);
  }
}
