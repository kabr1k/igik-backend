import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller()
export class ProfileMeController {
  constructor(private readonly usersService: UsersService) {}
  @Get('profile/me')
  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, access denied',
  })
  @UseGuards(JwtGuard)
  async getUser(@Request() req) {
    return await this.usersService.findByUuid(req.user.sub.uuid);
  }
}
