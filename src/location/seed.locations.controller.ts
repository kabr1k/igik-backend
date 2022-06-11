import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';

@Controller()
export class SeedLocationsController {
  constructor(private readonly languageService: LocationService) {}
  @Get('locations/seed')
  @ApiTags('Locations')
  @ApiOperation({
    description: 'Seed default locations to DB. Use only in dev environment',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.languageService.seed();
  }
}
