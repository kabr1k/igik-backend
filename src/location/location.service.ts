import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Location } from './location.entity';
import { locationsSeed } from '../seed/seeds/locations.seed';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  public async findAll(): Promise<Location[] | undefined> {
    return await this.locationRepository.find();
  }
  public async findOne(uuid) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Location)
      .createQueryBuilder('location')
      .where('location.uuid = :uuid', { uuid })
      .leftJoinAndSelect('location.users', 'user')
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.locationRepository.save(locationsSeed);
  }
}
