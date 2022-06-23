import {
  Body,
  Controller,
  Get, HttpException, Post,
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
import { GetMentorsDto } from "../interfaces/get.mentors.dto";

@Controller()
export class MentorsController {
  constructor(private readonly usersService: UsersService) {}
  @Post('api/v1/mentors')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get random mentors list with pagination' })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: GetMentorsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No results',
  })
  async getMentors(@Body() body: MentorsQueryDto) {
    const mentors = await this.usersService.find(body);
    if (mentors.length !== 0) {
      return { mentors, count: mentors.length };
    } else {
      throw new HttpException('No results', 404);
    }
  }
}
