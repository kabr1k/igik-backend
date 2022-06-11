import { Controller, Get, HttpException, Query, Request, UseGuards } from "@nestjs/common";
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
import { MentorsQueryDto } from "../interfaces/mentors.query.dto";

@Controller()
export class MentorsCountController {
  constructor(private readonly usersService: UsersService) {}
  @Get('api/v1/mentors/count')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get mentors count' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getMentorsCount() {
    return await this.usersService.countMentors();
  }
}
