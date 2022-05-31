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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { LoginService } from './login.service';
import { ValidationPipe } from '../../common/validation.pipe';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('auth/login')
  @ApiTags('Standard authentication')
  @ApiOperation({
    description: 'JWT login endpoint. Email confirmation required to log in.',
  })
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
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 406,
    description: 'Email is not confirmed',
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
