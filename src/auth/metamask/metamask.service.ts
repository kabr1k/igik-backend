import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import ethUtil from 'ethereumjs-util';
@Injectable()
export class MetamaskService {
  constructor(private readonly usersService: UsersService) {}
  private createNonce() {
    return Math.floor(Math.random() * 1000000);
  }
  public async getNonce(walletAddress): Promise<number> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      return user.nonce;
    } else {
      const nonce = this.createNonce();
      await this.usersService.saveUser({ walletAddress, nonce });
      return nonce;
    }
  }
  public async verifySignature(walletAddress, signature): Promise<boolean> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      const msg = `Nonce: ${user.nonce}`;
      const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
      const msgBuffer = ethUtil.toBuffer(msgHex);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature).toString(); // ту стринг?
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s,
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addressBuffer);
      if (address.toLowerCase() === walletAddress) {
        return true;
      } else {
        throw new UnauthorizedException;
      }
    } else {
      throw new NotFoundException;
    }
  }
}
