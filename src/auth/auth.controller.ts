import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotAcceptableException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decorator';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../interfaces/register.user.dto';
import { LoginUserDto } from '../interfaces/login.user.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtDto } from '../interfaces/jwt.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('auth/register')
  @ApiTags('auth')
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created, and logged in',
    type: JwtDto,
  })
  @ApiResponse({
    status: 406,
    description: 'Not acceptable, user already exists',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.createUser(registerUserDto);
    if (user) {
      return await this.authService.login(user);
    } else {
      throw new NotAcceptableException();
    }
  }

  @Post('auth/login')
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User has been logged in',
    type: JwtDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @HttpCode(200)
  @UseGuards(LocalGuard)
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @ApiTags('admin')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource, access denied',
  })
  @ApiHeader({
    name: 'Authorization',
  })
  @Get('admin')
  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
