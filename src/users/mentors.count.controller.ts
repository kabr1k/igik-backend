import { Controller, Get, HttpException, Query, Request, UseGuards } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';

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
