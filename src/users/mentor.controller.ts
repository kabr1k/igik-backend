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

@Controller()
export class MentorController {
  constructor(private readonly usersService: UsersService) {}
  @Get('mentor')
  @ApiTags('Users')
  @ApiOperation({ description: 'Get public mentor profile with joined entities' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Mentor not found.',
  })
  async getMentor(@Query() query: MentorQueryDto) {
    const result = await this.usersService.findByUuid(query.uuid);
    if (result) {
      return result;
    } else {
      throw new HttpException('Mentor not found', 404);
    }
  }
}
