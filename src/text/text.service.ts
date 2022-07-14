import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Text } from './text.entity';
import { categoriesSeed } from '../seed/seeds/categories.seed';
@Injectable()
export class TextService {
  constructor(
    @InjectRepository(Text)
    private textRepository: Repository<Text>,
  ) {}
  public async findAll(): Promise<Text[] | undefined> {
    return await this.textRepository.find();
  }
  public async findBySlug(slug) {
    const entityManager = getManager();
    return await entityManager
      .getRepository(Text)
      .createQueryBuilder('text')
      .where('text.slug = :slug', { slug })
      .getOne();
  }
  public async seed(): Promise<void> {
    await this.textRepository.save([
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-it',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-digital',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-vpi',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-audio',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-social',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-business',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-design',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-writing',
      },
      {
        text: 'Lorem ipsum dolor sit amet consectetur text more text',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-lifestyle',
      },
    ]);
  }
}
