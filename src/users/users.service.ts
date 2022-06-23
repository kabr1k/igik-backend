import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, getManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { usersSeed } from '../seed/seeds/users.seed';
import { CalendlyService } from '../calendly/calendly.service';
import { UpdateProfileDbDto } from '../interfaces/update.profile.db.dto';
import { OrderStatus } from '../enums/order.status';
import { MentorsQueryDto } from '../interfaces/mentors.query.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly calendlyService: CalendlyService,
  ) {}
  public async seed(
    categories,
    specialities,
    locations,
    languages,
  ): Promise<void> {
    await this.usersRepository.save({
      ...usersSeed[0],
      category: categories[0],
      location: locations[0],
      specialities: [specialities[0], specialities[1]],
      languages: [languages[0], languages[1]],
    });
    await this.usersRepository.save({
      ...usersSeed[1],
      category: categories[1],
      location: locations[1],
      specialities: [specialities[1], specialities[2], specialities[3]],
      languages: [languages[2]],
    });
    await this.usersRepository.save({
      ...usersSeed[2],
      category: categories[2],
      location: locations[3],
      specialities: [specialities[0], specialities[1]],
      languages: [languages[2], languages[1]],
    });
    await this.usersRepository.save({
      ...usersSeed[3],
      category: categories[2],
      location: locations[3],
      specialities: [specialities[4], specialities[5], specialities[6]],
      languages: [languages[3]],
    });
  }
  public async countMentors(): Promise<number | undefined> {
    const entityManager = getManager();
    return await entityManager.count(User, {
      where: {
        role: 'mentor',
      },
    });
  }
  public async findByUuid(uuid: string): Promise<User | undefined> {
    const entityManager = getManager();
    return await entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.languages', 'language')
      .leftJoinAndSelect('user.experience', 'experience')
      .leftJoinAndSelect('user.specialities', 'speciality')
      .leftJoinAndSelect('user.category', 'category')
      .leftJoinAndSelect(
        'user.receivedOrders',
        'userReceivedOrder',
        'userReceivedOrder.status <> :pending AND userReceivedOrder.status <> :canceled',
        { pending: OrderStatus.PENDING, canceled: OrderStatus.CANCELED_SYSTEM },
      )
      .orderBy('userReceivedOrder.createdAt', 'DESC')
      .leftJoinAndSelect('userReceivedOrder.buyer', 'buyer')
      .leftJoinAndSelect(
        'user.postedOrders',
        'userPostedOrder',
        'userPostedOrder.status <> :pending AND userPostedOrder.status <> :canceled',
        { pending: OrderStatus.PENDING, canceled: OrderStatus.CANCELED_SYSTEM },
      )
      .orderBy('userPostedOrder.createdAt', 'DESC')
      .leftJoinAndSelect('userPostedOrder.seller', 'seller')
      .leftJoinAndSelect('seller.category', 'sellerCategory')
      .getOne();
  }
  public async find({
    amount,
    page,
    priceRange,
    search,
    category,
    specialities,
  }): Promise<User[]> {
    let offset, limit;
    if (+page === 1) {
      limit = +amount + 1;
      offset = 0;
    } else {
      limit = +amount;
      offset = +page * +amount - 1;
    }
    if (page === 0) {
      page = 1;
    }
    const skip = page === 1 ? 0 : amount;
    const entityManager = getManager();
    let searchString, min, max;
    if (search) {
      searchString = '%' + search + '%';
    } else {
      searchString = '%';
    }
    if (!priceRange) {
      min = 0;
      max = 10000000;
    }
    const query = entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.category', 'category')
      .leftJoinAndSelect('user.specialities', 'speciality')
      .where('user.role = :role', { role: 'mentor' })
      .andWhere('user.active = :active', { active: true })
      .andWhere('user.eventPrice >= :min', { min })
      .andWhere('user.eventPrice <= :max', { max })
      .leftJoinAndSelect('user.location', 'location')
      .andWhere(
        new Brackets((qb) => {
          qb.where('location.name like :search', {
            search: searchString,
          })
            .orWhere('user.about like :search', { search: searchString })
            .orWhere('user.firstName like :search', { search: searchString })
            .orWhere('user.lastName like :search', { search: searchString });
        }),
      )
      .leftJoinAndSelect('user.languages', 'language')
      .leftJoinAndSelect('user.experience', 'experience');
    if (category) {
      query.andWhere('category.uuid = :uuid', { uuid: category.uuid });
    }
    if (specialities && specialities.length > 0) {
      query.andWhere('speciality.uuid IN (:...specialities)', {
        specialities,
      });
    }
    query.skip(skip).take(amount).orderBy('user.email');
    return await query.getMany();
  }
  public async findByWallet(walletAddress: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ walletAddress });
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }
  public async saveUser(user): Promise<User | null> {
    return await this.usersRepository.save(user);
  }
  private check(token, email) {
    const hash = createHash('sha256')
      .update(email + this.configService.get('HASH_SALT'))
      .digest('hex');
    return token === hash;
  }
  public async updateProfile({ uuid }, updateDto): Promise<User | null | 401> {
    let user = await this.findByUuid(uuid);
    let hash;
    if (updateDto.oldPassword) {
      hash = createHash('sha256').update(updateDto.oldPassword).digest('hex');
    }
    const profile: UpdateProfileDbDto = {
      uuid,
    };
    if (updateDto.firstName) {
      profile.firstName = updateDto.firstName;
    }
    if (updateDto.lastName) {
      profile.lastName = updateDto.lastName;
    }
    if (updateDto.calendlyLink) {
      profile.calendlyLink = updateDto.calendlyLink;
    }
    if (updateDto.eventPrice) {
      profile.eventPrice = updateDto.eventPrice;
    }
    if (updateDto.active) {
      profile.active = updateDto.active;
    }
    if (updateDto.specialities) {
      profile.specialities = updateDto.specialities;
    }
    if (updateDto.languages) {
      profile.languages = updateDto.languages;
    }
    if (updateDto.category) {
      profile.category = updateDto.category;
    }
    if (updateDto.location) {
      profile.location = updateDto.location;
    }
    if (updateDto.experience) {
      profile.experience = updateDto.experience;
    }
    if (updateDto.socialNetwork1) {
      profile.socialNetwork1 = updateDto.socialNetwork1;
    }
    if (updateDto.socialNetwork2) {
      profile.socialNetwork2 = updateDto.socialNetwork2;
    }
    if (updateDto.socialNetwork3) {
      profile.socialNetwork3 = updateDto.socialNetwork3;
    }
    if (updateDto.about) {
      profile.about = updateDto.about;
    }
    if (updateDto.password) {
      if (user.passwordHash === hash) {
        profile.passwordHash = createHash('sha256')
          .update(updateDto.password)
          .digest('hex');
      } else {
        return 401;
      }
    }
    // обновим длительность события если пришла новая ссылка
    if (updateDto.calendlyLink && user.calendlyRefreshToken) {
      const response = await this.calendlyService.getTokenByRefresh(
        user.calendlyRefreshToken,
        user,
      );
      const calendlyEventTypes =
        await this.calendlyService.getCalendlyEventTypes(
          response.access_token,
          user,
        );
      profile.eventDuration = calendlyEventTypes.collection.find(
        (event) => event.scheduling_url === profile.calendlyLink,
      ).duration;
    }
    await this.usersRepository.save(profile);
    user = await this.findByUuid(uuid);
    // включим возможность публикации если все поля заполнены
    if (this.checkUser(user)) {
      await this.usersRepository.save({ uuid, enabled: true });
      return await this.findByUuid(uuid);
    } else {
      return user;
    }
  }
  private checkUser(user) {
    return !!(
      user.firstName &&
      user.lastName &&
      user.calendlyLink &&
      user.stripeOnboarded &&
      user.specialities.length >= 1 &&
      user.languages.length >= 1 &&
      user.category &&
      user.location &&
      user.experience &&
      user.eventPrice &&
      user.about
    );
  }
  public async updatePassword(updateDto): Promise<User | null> {
    if (this.check(updateDto.token, updateDto.email)) {
      const user = await this.usersRepository.findOne({
        email: updateDto.email,
      });
      await this.usersRepository.save({
        uuid: user.uuid,
        passwordHash: createHash('sha256')
          .update(updateDto.password)
          .digest('hex'),
      });
      return await this.usersRepository.findOne({
        uuid: user.uuid,
      });
    } else {
      return null;
    }
  }
}
