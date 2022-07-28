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
        text: 'On iGik you can find a programmer for live mentoring or for conducting a project. Master essential programming concepts, practice your newfound coding skills in Python, PHP, HTML, SAS, JavaScript, jQuery, CSS, React and more, with the assistance of programming experts located all around the world. You can find data science and analysis mentors today to improve your skills and achieve your personal goals. Get guidance on how to become a mobile app developer and find out everything you need to know about the mobile app landscape. Get help from game development experts. Learn software testing and successfully become software testers.',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-it',
      },
      {
        text: 'Struggling to learn SEO on your own? Get trained by SEO experts to get you from where you are now, to where you want to be. You can join a SEO mentorship on iGik. A leading digital marketing expert will plan and oversee all digital channels for your business – website, content marketing, social media, email marketing, SEO, and PPC. Find web analytics experts who will put all tracking data to work for your business. Discover, using content marketing experts,how to create a successful content marketing strategy that will help target your audience, and industry leaders. Learn every step of the video marketing process, from choosing goals to creating videos and tracking success. Get exposure for your podcast with podcast marketing best practices from our experts.',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-digital',
      },
      {
        text: 'Looking for professional event videography experts to work with? On iGik, you can easily find event videography experts as well as photography experts. Hire freelance video shooting experts and get your project done remotely online. Our photo and video editing experts can help your business grow. Our open community of freelancers are ready to support your personal journey by improving your own photo or video editing skills. You can use our network to find filmmaking experts or video production experts in minutes.',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-vpi',
      },
      {
        text: 'Want to learn more about recording audio or video? Looking for professional audio and sound editing experts to work with? iGik has you covered. You can get tips from our audio and sound editing experts. Learn how to record great audio and how to remove background noise from your recording. If you have multiple voice overs, music or sound effects, hire an experienced audio editing expert to take care of the post production work. Music mentors will share with you the best music production tips and tricks. On iGik, you can also find music writing experts for any job necessary.',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-audio',
      },
      {
        text: 'First time looking for a social media expert and not sure where to start? Are you in need of an independent expert eye to keep you on track with implementing your own marketing plan or social media strategy? Then you are in the right place. Our freelance community of SMM experts are ready to help your brand engage larger audiences on social media. They will help you with all aspects, from building social media strategy, social media monitoring to influencer marketing, social media analysis and more.',
        title: 'Category title',
        metaDescription: 'Some met description',
        metaTitle: 'Some title',
        slug: 'categories-social',
      },
      {
        text: "Whether you are starting your own business or looking to expand, iGik experts offer their help with your business, including writing a business plan, organising finances, managing tax, and marketing your business. Contact one of our experts to get help with accounting issues or queries. Our experts deliver the perfect level of tax consulting that you need to achieve your goals and provide help with your management development needs. With the help of your dedicated business consulting expert, you'll receive an expert's view of your company. Whether you own Bitcoin, Ethereum, Dogecoin, NFTs or you’re new to the world of crypto, a financial expert who specializes in cryptocurrencies can help you to figure out how to buy cryptocurrencies and make smarter money moves.",
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
