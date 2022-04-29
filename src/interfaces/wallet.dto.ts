import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty()
  wallet_address: string;
}
