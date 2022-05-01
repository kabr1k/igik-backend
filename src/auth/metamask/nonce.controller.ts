import { Controller, Get, Param, Request, Res } from "@nestjs/common";
import { MetamaskService } from './metamask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NonceDto } from '../../interfaces/nonce.dto';
import { WalletDto } from "../../interfaces/wallet.dto";

@Controller()
export class NonceController {
  constructor(private readonly metamaskService: MetamaskService) {}
  // Check if user exists
  // ... search in database for user and returns its current nonce
  @Get(':wallet_address/nonce')
  @ApiTags('Metamask authentication')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: NonceDto,
  })
  async nonce(@Param() walletDto: WalletDto) {
    const result = await this.metamaskService.getNonce(
      walletDto.wallet_address,
    );
    return result;
  }
}
