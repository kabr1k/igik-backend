import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Language } from './language.entity';
import { languagesSeed } from '../seed/seeds/languages.seed';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
@Injectable()
export class LanguageService extends TypeOrmCrudService<Language> {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {
    super(languageRepository);
  }
  public async findAll(): Promise<Language[] | undefined> {
    return await this.languageRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }
  public async findLanguage(uuid) {
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
