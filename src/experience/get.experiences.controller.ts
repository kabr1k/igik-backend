import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { ExperienceResponseDto } from '../interfaces/experience.response.dto';

@Controller()
export class GetExperiencesController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('api/v1/experiences')
  @ApiTags('Experiences')
  @ApiOperation({ description: 'Get all experiences' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [ExperienceResponseDto],
  })
  async find(@Request() req) {
    return await this.experienceService.findAll();
  }
}
