import {
  Body,
  Controller,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from '../interfaces/update.profile.dto';
import { User } from './user.entity';
import { UpdatePasswordDto } from '../interfaces/update.password.dto';

@Controller()
export class PasswordUpdateController {
  constructor(private readonly usersService: UsersService) {}
  @Post('api/v1/profile/update/pass')
  @ApiTags('Users')
  @ApiOperation({
    description:
      'Public endpoint to recover the password, invoke after entering the new password.',
  })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Token or email is invalid',
  })
  async change(@Body() updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersService.updatePassword(updatePasswordDto);
    if (user) {
      return user;
    } else {
      throw new HttpException('Token or email is invalid', 401);
    }
  }
}
