import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Speciality } from './speciality.entity';
import { specialitiesSeed } from '../seed/seeds/specialities.seed';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
@Injectable()
export class SpecialityService extends TypeOrmCrudService<Speciality> {
  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {
    super(specialityRepository);
  }
  public async findAll(): Promise<Speciality[] | undefined> {
    return await this.specialityRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }
  public async findSpeciality(uuid) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Speciality)
      .createQueryBuilder('speciality')
      .where('speciality.uuid = :uuid', { uuid })
      .leftJoinAndSelect('speciality.users', 'user')
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.specialityRepository.save(specialitiesSeed);
  }
}
