import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Category } from './category.entity';
import { categoriesSeed } from '../seeds/categories.seed';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  public async findAll(): Promise<Category[] | undefined> {
    return await this.categoryRepository.find();
  }
  public async findOne(uuid) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.uuid = :uuid', { uuid })
      .leftJoinAndSelect('category.users', 'user')
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.categoryRepository.save(categoriesSeed);
  }
}
