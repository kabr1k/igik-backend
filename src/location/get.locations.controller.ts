import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { LocationsResponseDto } from '../interfaces/locations.response.dto';

@Controller()
export class GetLocationsController {
  constructor(private readonly locationService: LocationService) {}
  @Get('api/v1/locations')
  @ApiTags('Locations')
  @ApiOperation({ description: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [LocationsResponseDto],
  })
  async find(@Request() req) {
    return await this.locationService.findAll();
  }
}
