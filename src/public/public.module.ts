import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PublicController } from './public.controller';
import { ConfigModule } from '@nestjs/config';
import { PersonalController } from './personal.controller';
import { SsrMiddleware } from '../common/ssr.middleware';

@Module({
  imports: [ConfigModule],
  providers: [],
  controllers: [PublicController],
  exports: [],
})
export class PublicModule {}
