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
import { User } from './user.entity';
import { MentorQueryDto } from "../interfaces/mentor.query.dto";
import { MentorsQueryDto } from "../interfaces/mentors.query.dto";

@Controller()
export class MentorsController {
  constructor(private readonly usersService: UsersService) {}
  @Get('mentors')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get random mentors list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [User],
  })
  async getMentors(@Query() query: MentorsQueryDto) {
    return await this.usersService.find(query);
  }
}
