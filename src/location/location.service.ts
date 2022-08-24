import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Location } from './location.entity';
import { locationsSeed } from '../seed/seeds/locations.seed';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
@Injectable()
export class LocationService extends TypeOrmCrudService<Location> {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    super(locationRepository);
  }
  public async findAll(): Promise<Location[] | undefined> {
    return await this.locationRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }
  public async findLocation(uuid) {
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
