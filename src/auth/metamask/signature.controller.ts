import { Body, Controller, HttpCode, Param, Post, Query, Request } from "@nestjs/common";
import { MetamaskService } from './metamask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { SignatureDto } from '../../interfaces/signature.dto';
import { WalletDto } from "../../interfaces/wallet.dto";

@Controller()
export class SignatureController {
  constructor(private readonly metamaskService: MetamaskService) {}
  @Post(':wallet_address/signature')
  @ApiTags('Metamask authentication')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: JwtDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Signature is not valid',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  async nonce(@Body() signatureDto: SignatureDto, @Param() walletDto: WalletDto) {
    if (
      await this.metamaskService.verifySignature(
        walletDto.wallet_address,
        signatureDto.signature,
      )
    ) {
      // create new nonce, save user, set jwt token
      return;
    }
  }
}
