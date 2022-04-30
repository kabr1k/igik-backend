import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { MetamaskModule } from './auth/metamask/metamask.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    LoginModule,
    RegisterModule,
    MetamaskModule,
    UsersModule,
    AdminModule,
    // PublicModule,
  ],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private configService: ConfigService,
  ) {}
}
