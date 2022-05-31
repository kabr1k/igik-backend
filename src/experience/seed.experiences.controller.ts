import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';

@Controller()
export class SeedExperiencesController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('experiences/seed')
  @ApiTags('Experiences')
  @ApiOperation({
    description: 'Seed default experiences to DB. Use only in dev environment',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async find() {
    return await this.experienceService.seed();
  }
}
