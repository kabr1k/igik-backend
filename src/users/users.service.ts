import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { usersSeed } from '../seed/seeds/users.seed';
import { CalendlyService } from '../calendly/calendly.service';
import { UpdateProfileDto } from '../interfaces/update.profile.dto';
import { UpdateProfileDbDto } from '../interfaces/update.profile.db.dto';
import { updateOutput } from 'ts-jest/dist/compiler/compiler-utils';
import { OrderStatus } from '../enums/order.status';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly calendlyService: CalendlyService,
  ) {}
  public async seed(): Promise<void> {
    await this.usersRepository.save(usersSeed);
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
      .leftJoinAndSelect('user.receivedOrders', 'receivedOrder')
      .leftJoinAndSelect('receivedOrder.buyer', 'buyer')
      .leftJoinAndSelect('user.postedOrders', 'postedOrder')
      .where('postedOrder.status <> :status', { status: OrderStatus.PENDING })
      .andWhere('postedOrder.status <> :status', {
        status: OrderStatus.CANCELED_SYSTEM,
      })
      .orderBy('postedOrder.createdAt', 'DESC')
      .leftJoinAndSelect('postedOrder.seller', 'seller')
      .leftJoinAndSelect('seller.category', 'sellerCategory')
      .getOne();
  }
  public async find({ amount, page }): Promise<User[] | undefined> {
    let offset, limit;
    if (+page === 1) {
      limit = +amount + 1;
      offset = 0;
    } else {
      limit = +amount;
      offset = +page * +amount - 1;
    }
    console.log(offset, amount);
    const entityManager = getManager();
    return await entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.languages', 'languages')
      .leftJoinAndSelect('user.experience', 'experience')
      .leftJoinAndSelect('user.specialities', 'specialities')
      .leftJoinAndSelect('user.category', 'category')
      .orderBy('user.email')
      .limit(limit)
      .offset(offset)
      .getMany();
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
