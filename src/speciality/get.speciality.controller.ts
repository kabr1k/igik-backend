import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';
import { SpecialityDto } from '../interfaces/speciality.dto';
import { Speciality } from './speciality.entity';

@Controller()
export class GetSpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('speciality')
  @ApiTags('Specialities')
  @ApiOperation({
    description: 'Get speciality by UUID, returns speciality with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Speciality,
  })
  async find(@Query() query: SpecialityDto) {
    return await this.specialityService.findOne(query.uuid);
  }
}
