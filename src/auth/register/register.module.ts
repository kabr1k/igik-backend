import { Module } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';
import { LoginModule } from '../login/login.module';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/user.entity';
import { RegisterController } from './register.controller';
import { MailerModule } from '../../mailer/mailer.module';
import { MailerService } from '../../mailer/mailer.service';
import { CalendlyModule } from "../../calendly/calendly.module";

@Module({
  imports: [
    ConfigModule,
    CalendlyModule,
    MailerModule,
    LoginModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
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
    RegisterService,
    LoginService,
    UsersService,
    MailerService,
    ConfigService,
  ],
  controllers: [RegisterController],
  exports: [],
})
export class RegisterModule {}
