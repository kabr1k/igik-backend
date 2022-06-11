import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { GetLocationsController } from './get.locations.controller';
import { GetLocationController } from './get.location.controller';
import { SeedLocationsController } from './seed.locations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService],
  controllers: [
    GetLocationsController,
    GetLocationController,
  ],
  exports: [LocationService],
})
export class LocationsModule {}
