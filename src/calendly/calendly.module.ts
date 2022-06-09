import { forwardRef, Module } from "@nestjs/common";
import { CalendlyConnectController } from './calendly.connect.controller';
import { CalendlyService } from './calendly.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule],
  providers: [CalendlyService],
  controllers: [CalendlyConnectController],
  exports: [CalendlyService],
})
export class CalendlyModule {}
