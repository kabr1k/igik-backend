import { Module } from '@nestjs/common';
import { CalendlyConnectController } from './calendly.connect.controller';
import { CalendlyService } from './calendly.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CalendlyPutController } from "./calendly.put.controller";

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [CalendlyService],
  controllers: [CalendlyConnectController, CalendlyPutController],
  exports: [],
})
export class CalendlyModule {}
