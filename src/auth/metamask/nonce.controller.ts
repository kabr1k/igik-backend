import { Controller, Get, Request } from '@nestjs/common';
import { MetamaskService } from './metamask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';

@Controller()
export class NonceController {
  constructor(private readonly metamaskService: MetamaskService) {}
  // Check if user exists
  // ... search in database for user and returns its current nonce
  @Get(':wallet_address/nonce')
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
    return await this.metamaskService.createNonce(req.wallet_address);
  }
}
