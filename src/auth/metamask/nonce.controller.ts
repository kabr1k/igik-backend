import { Controller, Get, Param } from '@nestjs/common';
import { MetamaskService } from './metamask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NonceDto } from '../../interfaces/nonce.dto';
import { WalletDto } from '../../interfaces/wallet.dto';
import { ValidationPipe } from '../../common/validation.pipe';

@Controller()
export class NonceController {
  constructor(private readonly metamaskService: MetamaskService) {}
  @Get(':wallet_address/nonce')
  @ApiTags('Metamask authentication')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: NonceDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  async nonce(@Param(new ValidationPipe()) walletDto: WalletDto) {
    const result = await this.metamaskService.getNonce(
      walletDto.wallet_address,
    );
    return result;
  }
}
