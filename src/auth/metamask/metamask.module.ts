import { Module } from '@nestjs/common';
import { MetamaskService } from './metamask.service';
import { NonceController } from './nonce.controller';
import { SignatureController } from './signature.controller';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/user.entity';
import { LoginService } from '../login/login.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MetamaskModule,
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
  providers: [MetamaskService, UsersService, LoginService],
  controllers: [NonceController, SignatureController],
  exports: [],
})
export class MetamaskModule {}
