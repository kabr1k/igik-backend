import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { RegisterUserDto } from '../../interfaces/register.user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';

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
    type: JwtDto,
  })
  @ApiResponse({
    status: 406,
    description: 'Not acceptable, user already exists',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.registerService.createUser(registerUserDto);
    if (user) {
      return await this.loginService.login(user);
    } else {
      throw new NotAcceptableException();
    }
  }
}
