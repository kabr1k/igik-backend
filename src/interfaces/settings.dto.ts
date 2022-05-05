import { PartialType } from '@nestjs/swagger';
import { Settings } from '../settings/settings.entity';

export class SettingsDto extends PartialType(Settings) {}
