import { Controller, Get, Post, Request } from "@nestjs/common";
import { MetamaskService } from './metamask.service';
import { UsersService } from '../../users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { createHash } from 'crypto';
import ethUtil from 'ethereumjs-util';

@Controller()
export class SignatureController {
  constructor(
    private readonly metamaskService: MetamaskService,
    private readonly usersService: UsersService,
  ) {}
  // Check if user exists
  // ... search in database for user and returns its current nonce
  @Post(':wallet_address/signature')
  @ApiTags('Metamask authentication')
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created, and logged in',
    type: JwtDto,
  })
  @ApiResponse({
    status: 406,
    description: 'Not acceptable, user already exists',
  })
  async nonce(@Request() req) {
    return await this.metamaskService.verifySignature(req.wallet_address);
  }
}
