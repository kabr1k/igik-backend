import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { LocationsModule } from '../location/locations.module';
import { LanguagesModule } from '../languages/languages.module';
import { ExperienceModule } from '../experience/experience.module';
import { CategoriesModule } from '../category/categories.module';
import { SpecialitiesModule } from '../speciality/specialities.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    LocationsModule,
    LanguagesModule,
    ExperienceModule,
    CategoriesModule,
    SpecialitiesModule,
    UsersModule,
  ],
  providers: [],
  controllers: [SeedController],
  exports: [],
})
export class SeedModule {}
