import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Location } from './location.entity';
import { LocationDto } from "../interfaces/location.dto";
import { Speciality } from "../speciality/speciality.entity";
import { SpecialityDto } from "../interfaces/speciality.dto";

@Controller()
export class GetLocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('api/v1/location')
  @ApiTags('Locations')
  @ApiOperation({
    description: 'Get location by UUID, returns location with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Location,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: Location,
  })
  async find(@Query() query: LocationDto) {
    const result = await this.locationService.findOne(query.uuid)
    if (result) {
      return result;
    } else {
      throw new HttpException('Not found', 404);
    }
  }
}
