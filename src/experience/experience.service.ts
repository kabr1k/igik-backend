import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Experience } from './experience.entity';
import { experienceSeed } from '../seed/seeds/experience.seed';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
@Injectable()
export class ExperienceService extends TypeOrmCrudService<Experience> {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {
    super(experienceRepository);
  }
  public async findAll(): Promise<Experience[] | undefined> {
    return await this.experienceRepository.find();
  }
  public async findExperience(uuid) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Experience)
      .createQueryBuilder('experience')
      .where('experience.uuid = :uuid', { uuid })
      .leftJoinAndSelect('experience.users', 'user')
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.experienceRepository.save(experienceSeed);
  }
}
