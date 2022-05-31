import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { GetCategoriesController } from './get.categories.controller';
import { GetCategoryController } from './get.category.controller';
import { SeedCategoriesController } from './seed.categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [
    GetCategoriesController,
    GetCategoryController,
    SeedCategoriesController,
  ],
  exports: [CategoryService],
})
export class CategoriesModule {}
