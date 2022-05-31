import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.entity';
import { ExperienceDto } from '../interfaces/experience.dto';

@Controller()
export class GetExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('experience')
  @ApiTags('Experiences')
  @ApiOperation({
    description: 'Get experience by UUID, returns experience with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Experience,
  })
  async find(@Query() query: ExperienceDto) {
    return await this.experienceService.findOne(query.uuid);
  }
}
