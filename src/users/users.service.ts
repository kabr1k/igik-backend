import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { usersSeed } from '../seed/seeds/users.seed';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  public async seed(): Promise<void> {
    await this.usersRepository.save(usersSeed);
  }
  public async findByUuid(uuid: string): Promise<User | undefined> {
    const entityManager = getManager();
    return await entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.languages', 'languages')
      .leftJoinAndSelect('user.experience', 'experience')
      .leftJoinAndSelect('user.specialities', 'specialities')
      .leftJoinAndSelect('user.category', 'category')
      .leftJoinAndSelect('user.receivedOrders', 'receivedOrders')
      .leftJoinAndSelect('user.postedOrders', 'postedOrders')
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
    let profile;
    if (updateDto.password) {
      if (user.passwordHash === hash) {
        profile = {
          uuid,
          passwordHash: createHash('sha256')
            .update(updateDto.password)
            .digest('hex'),
          ...updateDto,
        };
        delete profile.password;
        delete profile.oldPassword;
      } else {
        return 401;
      }
    } else {
      profile = { uuid, ...updateDto };
    }
    await this.usersRepository.save(profile);
    user = await this.findByUuid(uuid);
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
      user.categories.length >= 1 &&
      user.languages.length >= 1 &&
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
