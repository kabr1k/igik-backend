import {
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { NonceDto } from '../../interfaces/nonce.dto';
const util = require('ethereumjs-util');
const web3 = require('web3');

@Injectable()
export class MetamaskService {
  constructor(private readonly usersService: UsersService) {}
  private createNonce() {
    return Math.floor(Math.random() * 1000000);
  }
  public async newNonce(walletAddress) {
    const nonce = this.createNonce();
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      await this.usersService.saveUser({ uuid: user.uuid, nonce });
    } else {
      await this.usersService.saveUser({ walletAddress, nonce });
    }
    return { nonce };
  }
  public async getNonce(walletAddress): Promise<NonceDto> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      return { nonce: +user.nonce };
    } else {
      return await this.newNonce(walletAddress);
    }
  }
  public async verifySignature(walletAddress, signature): Promise<number> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      const message = `Nonce: ${user.nonce}`;
      try {
        const sig = util.fromRpcSig(signature);
        const publicKey = util.ecrecover(
          util.hashPersonalMessage(Buffer.from(message)),
          sig.v,
          sig.r,
          sig.s,
        );
        const address = '0x' + util.pubToAddress(publicKey).toString('hex');
        if (address.toLowerCase() === walletAddress) {
          return 200;
        } else {
          return 401;
        }
      } catch (e) {
        return 406;
      }
    } else {
      return 404;
    }
  }
}
