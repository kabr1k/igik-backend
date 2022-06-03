import { Body, Controller, HttpException, Post, Request, UseGuards } from "@nestjs/common";
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

@Controller()
export class ProfileUpdateController {
  constructor(private readonly usersService: UsersService) {}
  @Post('profile/update')
  @ApiTags('Users')
  @ApiOperation({
    description:
      'Update user profile. Each field is optional, changing only the provided fields.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async change(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(
      req.user.sub,
      updateProfileDto,
    );
    switch (user) {
      case 401:
        throw new HttpException('Old password is incorrect', 401);
      default:
        return user;
    }
  }
}
