import {
  Body,
  Controller,
  HttpCode, NotAcceptableException,
  NotFoundException,
  Param,
  Post, UnauthorizedException
} from "@nestjs/common";
import { MetamaskService } from './metamask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtDto } from '../../interfaces/jwt.dto';
import { SignatureDto } from '../../interfaces/signature.dto';
import { WalletDto } from '../../interfaces/wallet.dto';
import { LoginService } from '../login/login.service';
import { UsersService } from '../../users/users.service';

@Controller()
export class SignatureController {
  constructor(
    private readonly metamaskService: MetamaskService,
    private readonly loginService: LoginService,
    private readonly usersService: UsersService,
  ) {}
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
    description: 'Signature address does not match wallet',
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: 406,
    description: 'Signature is not valid',
  })
  async signature(
    @Body() signatureDto: SignatureDto,
    @Param() walletDto: WalletDto,
  ) {
    switch (
      await this.metamaskService.verifySignature(
        walletDto.wallet_address,
        signatureDto.signature,
      )
    ) {
      case 200:
        await this.metamaskService.newNonce(walletDto.wallet_address);
        return await this.loginService.login(
          await this.usersService.findByWallet(walletDto.wallet_address),
        );
      case 401:
        throw new UnauthorizedException();
      case 404:
        throw new NotFoundException();
      case 406:
        throw new NotAcceptableException();
    }
  }
}
