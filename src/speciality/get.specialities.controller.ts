import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';
import { SpecialitiesResponseDto } from '../interfaces/specialities.response.dto';

@Controller()
export class GetSpecialitiesController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('api/v1/specialities')
  @ApiTags('Specialities')
  @ApiOperation({ description: 'Get all specialities' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [SpecialitiesResponseDto],
  })
  async find(@Request() req) {
    return await this.specialityService.findAll();
  }
}
