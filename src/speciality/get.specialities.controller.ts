import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';

@Controller()
export class GetSpecialitiesController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('specialities')
  @ApiTags('Profile')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find(@Request() req) {
    return await this.specialityService.findAll();
  }
}
