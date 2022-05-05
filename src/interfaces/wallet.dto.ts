import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString } from 'class-validator';

export class WalletDto {
  @ApiProperty()
  @IsEthereumAddress()
  wallet_address: string;
}
