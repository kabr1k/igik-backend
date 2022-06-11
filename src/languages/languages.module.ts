import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { GetLanguagesController } from './get.languages.controller';
import { GetLanguageController } from './get.language.controller';
import { SeedLanguagesController } from './seed.languages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService],
  controllers: [
    GetLanguagesController,
    GetLanguageController,
  ],
  exports: [LanguageService],
})
export class LanguagesModule {}
