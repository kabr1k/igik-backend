import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { GetExperiencesController } from './get.experiences.controller';
import { GetExperienceController } from './get.experience.controller';
import { SeedExperiencesController } from './seed.experiences.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  providers: [ExperienceService],
  controllers: [
    GetExperiencesController,
    GetExperienceController,
    SeedExperiencesController,
  ],
  exports: [ExperienceService],
})
export class ExperienceModule {}
