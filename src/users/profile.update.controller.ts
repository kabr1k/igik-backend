import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from '../interfaces/update.profile.dto';
import { User } from './user.entity';

@Controller()
export class ProfileUpdateController {
  constructor(private readonly usersService: UsersService) {}
  @Post('profile/update')
  @ApiTags('Users')
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
    return await this.usersService.updateProfile(
      req.user.sub,
      updateProfileDto,
    );
  }
}
