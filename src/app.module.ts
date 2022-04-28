import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { createHash } from 'crypto';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    StocksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private configService: ConfigService,
  ) {
    // console.log(createHash('sha256').update('kabrin').digest('hex'));
  }
}
