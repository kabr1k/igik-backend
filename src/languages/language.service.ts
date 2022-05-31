import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Language } from './language.entity';
import { languagesSeed } from '../seeds/languages.seed';
@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}
  public async findAll(): Promise<Language[] | undefined> {
    return await this.languageRepository.find();
  }
  public async findOne(uuid) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Language)
      .createQueryBuilder('language')
      .where('language.uuid = :uuid', { uuid })
      .leftJoinAndSelect('language.users', 'user')
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.languageRepository.save(languagesSeed);
  }
}
