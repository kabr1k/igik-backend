import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RegisterUserDto } from '../../interfaces/register.user.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';
import { ValidationPipe } from '../../common/validation.pipe';

@Controller()
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}
  @Post('api/v1/auth/register')
  @ApiTags('Standard authentication')
  @ApiOperation({ description: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created, and logged in',
  })
  @ApiResponse({
    status: 406,
    description: 'Email already exists',
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
      throw new HttpException(
        'Email already exists.',
        406,
      );
    }
  }
}
