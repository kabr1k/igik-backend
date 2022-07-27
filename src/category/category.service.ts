import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Category } from './category.entity';
import { categoriesSeed } from '../seed/seeds/categories.seed';
import { User } from "../users/user.entity";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
  public async findAll(): Promise<Category[] | undefined> {
    return await this.categoryRepository.find();
  }
  public async findBySlug(slug) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.slug = :slug', { slug })
      // .leftJoinAndSelect('category.users', 'user')
      .getOne();
  }
  public async findCategory(uuid) {
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
