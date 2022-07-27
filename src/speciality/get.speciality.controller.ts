import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecialityService } from './speciality.service';
import { SpecialityDto } from '../interfaces/speciality.dto';
import { Speciality } from './speciality.entity';

@Controller()
export class GetSpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}
  @Get('api/v1/speciality')
  @ApiTags('Specialities')
  @ApiOperation({
    description: 'Get speciality by UUID, returns speciality with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Speciality,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: Speciality,
  })
  async find(@Query() query: SpecialityDto) {
    const result = await this.specialityService.findSpeciality(query.uuid)
    if (result) {
      return result;
    } else {
      throw new HttpException('Not found', 404);
    }
  }
}
