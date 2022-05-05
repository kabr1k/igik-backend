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
    const settings = await this.settingsRepository.findOne();
    return settings;
  }
}
