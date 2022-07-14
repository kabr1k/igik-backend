import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './text.entity';
import { TextController } from './text.controller';
import { CategoriesModule } from "../category/categories.module";

@Module({
  imports: [CategoriesModule, TypeOrmModule.forFeature([Text])],
  providers: [TextService],
  controllers: [
    TextController
  ],
  exports: [TextService],
})
export class TextModule {}
