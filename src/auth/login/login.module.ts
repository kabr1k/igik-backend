import { Module } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { LoginService } from '../login/login.service';
import { LoginController } from './login.controller';
import { UsersModule } from '../../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { CalendlyModule } from "../../calendly/calendly.module";

@Module({
  imports: [
    UsersModule,
    CalendlyModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '6000s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UsersService,
    LoginService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],
  controllers: [LoginController],
  exports: [LoginService],
})
export class LoginModule {}
