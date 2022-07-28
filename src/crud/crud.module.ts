import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/controller';
import { CategoryController } from './category/controller';
import { ExperienceController } from './experience/controller';
import { SpecialityController } from './speciality/controller';
import { LanguageController } from './language/controller';
import { LocationController } from './location/controller';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../category/categories.module';
import { ExperienceModule } from '../experience/experience.module';
import { SpecialitiesModule } from '../speciality/specialities.module';
import { LanguagesModule } from '../languages/languages.module';
import { LocationsModule } from '../location/locations.module';
import { OrderController } from "./order/controller";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    CategoriesModule,
    ExperienceModule,
    SpecialitiesModule,
    LanguagesModule,
    LocationsModule,
    OrdersModule,
  ],
  providers: [],
  controllers: [
    UserController,
    CategoryController,
    ExperienceController,
    SpecialityController,
    LanguageController,
    LocationController,
    OrderController,
  ],
  exports: [],
})
export class CrudModule {}
