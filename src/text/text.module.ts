import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Text } from './text.entity';
import { TextController } from './text.controller';
import { SeedTextController } from "./seed.text.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Text])],
  providers: [TextService],
  controllers: [
    TextController
  ],
  exports: [TextService],
})
export class TextModule {}
