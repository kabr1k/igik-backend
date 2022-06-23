import {
  Body,
  Controller,
  Get, Post,
  Query
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { MentorsQueryDto } from '../interfaces/mentors.query.dto';

@Controller()
export class MentorsController {
  constructor(private readonly usersService: UsersService) {}
  @Post('api/v1/mentors')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get random mentors list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [User],
  })
  async getMentors(@Body() body: MentorsQueryDto) {
    return await this.usersService.find(body);
  }
}
