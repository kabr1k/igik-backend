import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller()
export class ProfileMeController {
  constructor(private readonly usersService: UsersService) {}
  @Get('api/v1/profile/me')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get full user profile with joined entities' })
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
    const me = await this.usersService.findByUuid(req.user.sub.uuid);
    return me;
  }
}
