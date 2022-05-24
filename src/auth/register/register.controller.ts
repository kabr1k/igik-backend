import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { RegisterUserDto } from '../../interfaces/register.user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';
import { ValidationPipe } from '../../common/validation.pipe';

@Controller()
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}
  @Post('auth/register')
  @ApiTags('Standard authentication')
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created, and logged in',
  })
  @ApiResponse({
    status: 406,
    description: 'Not acceptable, user already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  async register(@Body(new ValidationPipe()) registerUserDto: RegisterUserDto) {
    const user = await this.registerService.createUser(registerUserDto);
    if (user) {
      return;
    } else {
      throw new HttpException('Email already exists', 406);
    }
  }
}
