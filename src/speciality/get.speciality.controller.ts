import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';
import { SpecialityDto } from '../interfaces/speciality.dto';

@Controller()
export class GetSpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('speciality')
  @ApiTags('Profile')
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find(@Query() query: SpecialityDto) {
    return await this.specialityService.findOne(query.uuid);
  }
}
