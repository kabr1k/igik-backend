import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { Experience } from './experience.entity';
import { ExperienceDto } from '../interfaces/experience.dto';
import { Speciality } from "../speciality/speciality.entity";
import { SpecialityDto } from "../interfaces/speciality.dto";

@Controller()
export class GetExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('api/v1/experience')
  @ApiTags('Experiences')
  @ApiOperation({
    description: 'Get experience by UUID, returns experience with users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: Experience,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: Experience,
  })
  async find(@Query() query: ExperienceDto) {
    const result = await this.experienceService.findExperience(query.uuid)
    if (result) {
      return result;
    } else {
      throw new HttpException('Not found', 404);
    }
  }
}
