import { Module } from '@nestjs/common';
import { MetamaskService } from './metamask.service';
import { NonceController } from './nonce.controller';
import { SignatureController } from './signature.controller';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../users/user.entity";

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [MetamaskService, UsersService],
  controllers: [NonceController, SignatureController],
  exports: [],
})
export class MetamaskModule {}
