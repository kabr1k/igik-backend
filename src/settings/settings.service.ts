import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}
  public async saveSettings(settings): Promise<Settings | null> {
    return await this.settingsRepository.save(settings);
  }
  public async getSettings(): Promise<Settings | null> {
    return await this.settingsRepository.findOne();
  }
  public async setDefaultSettings(): Promise<void> {
    await this.saveSettings({
      contractId: '0x2917ad66e94dc7f6f0d608c0a5d3dd353546b8d9',
      gas: 300000,
      list: [1, 2, 3],
      max: 3,
      tokensTotal: 5000,
      tokenPrice: 0.01,
      preSaleDate: new Date(1649759400000),
      saleDate: new Date(1649759400000),
      apiUrl: 'https://[HOST]/node/entrypoint/api/app',
      userAssetsCommand: 'nft.user.assets',
      txStatusCommand: 'nft.tx',
    });
  }
}
