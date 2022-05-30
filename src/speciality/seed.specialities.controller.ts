import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';
import { SpecialityDto } from '../interfaces/speciality.dto';

@Controller()
export class SeedSpecialitiesController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('specialities/seed')
  @ApiTags('Profile')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.specialityService.seed();
  }
}
