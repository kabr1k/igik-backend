import {
  Controller,
  Get,
  Request,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocationService } from '../location/location.service';
import { LanguageService } from '../languages/language.service';
import { SpecialityService } from '../speciality/speciality.service';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { ExperienceService } from '../experience/experience.service';
import { TextService } from "../text/text.service";

@Controller()
export class SeedController {
  constructor(
    private readonly usersService: UsersService,
    private readonly locationService: LocationService,
    private readonly languageService: LanguageService,
    private readonly specialityService: SpecialityService,
    private readonly categoryService: CategoryService,
    private readonly experienceService: ExperienceService,
    private readonly textService: TextService,
  ) {}
  @Get('ksh74hf83')
  @ApiTags('Development')
  @ApiOperation({
    description: 'Seed DB',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async seed(@Request() req) {
    await this.textService.seed();
    await this.categoryService.seed();
    await this.locationService.seed();
    await this.languageService.seed();
    await this.experienceService.seed();
    await this.specialityService.seed();
    const categories = await this.categoryService.findAll();
    const specialities = await this.specialityService.findAll();
    const locations = await this.locationService.findAll();
    const languages = await this.languageService.findAll();
    const experiences = await this.experienceService.findAll();
    await this.usersService.seed(
      categories,
      specialities,
      locations,
      languages,
      experiences,
    );
  }
}
