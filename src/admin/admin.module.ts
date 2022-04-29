import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  providers: [],
  controllers: [AdminController],
  exports: [],
})
export class AdminModule {}
