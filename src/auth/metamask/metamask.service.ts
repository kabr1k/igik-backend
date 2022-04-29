import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class MetamaskService {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  async createNonce(walletAddress): Promise<number> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      return user.nonce;
    } else {
      const nonce = Math.floor(Math.random() * 1000000);
    }
  }
  async verifySignature(walletAddress): Promise<number> {
    const user = await this.usersService.findByWallet(walletAddress);
    if (user) {
      return user.nonce;
    } else {
      const nonce = Math.floor(Math.random() * 1000000);
    }
  }
}
