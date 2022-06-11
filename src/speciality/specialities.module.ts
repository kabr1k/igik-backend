import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './speciality.entity';
import { GetSpecialitiesController } from './get.specialities.controller';
import { GetSpecialityController } from './get.speciality.controller';
import { SeedSpecialitiesController } from './seed.specialities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality])],
  providers: [SpecialityService],
  controllers: [
    GetSpecialitiesController,
    GetSpecialityController,
  ],
  exports: [SpecialityService],
})
export class SpecialitiesModule {}
