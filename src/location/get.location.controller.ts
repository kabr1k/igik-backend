import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CategoryDto } from '../interfaces/category.dto';
import { Location } from './location.entity';
import { LocationDto } from "../interfaces/location.dto";

@Controller()
export class GetLocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('location')
  @ApiTags('Locations')
  @ApiOperation({
    description: 'Get location by UUID, returns location with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Location,
  })
  async find(@Query() query: LocationDto) {
    return await this.locationService.findOne(query.uuid);
  }
}
