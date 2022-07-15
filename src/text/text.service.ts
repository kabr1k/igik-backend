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
        text:
          'On iGik you can find a programmer for live mentoring or conducting a project. Master essential programming concepts, practice your newfound coding skills in Python, PHP, HTML, SAS, JavaScript, jQuery, CSS, React and more with programming experts located all around the world. You can  find data science and analysis mentors today to improve your skills and achieve your personal goals.\n' +
          'Get guidance on how to become a mobile app developer and find out everything you need to know about the mobile app landscape. Get help from game development experts. Learn software testing and successfully become software testers.',
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
