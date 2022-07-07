import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [],
  controllers: [PublicController],
  exports: [],
})
export class PublicModule {}
