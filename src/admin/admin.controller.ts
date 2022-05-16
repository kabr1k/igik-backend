import { Controller, Get, Request, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AdminController {
  constructor() {}
  @Get('admin')
  @ApiTags('Protected routes')
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
  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
