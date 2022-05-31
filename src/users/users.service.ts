import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  public async findByWallet(walletAddress: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ walletAddress });
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }
  public async findByUuid(uuid: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ uuid });
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
  public async updateProfile({ uuid }, updateDto): Promise<User | null> {
    let profile;
    if (updateDto.password) {
      profile = {
        uuid,
        passwordHash: createHash('sha256')
          .update(updateDto.password)
          .digest('hex'),
        ...updateDto,
      };
      delete profile.password;
    } else {
      profile = { uuid, ...updateDto };
    }
    await this.usersRepository.save(profile);
    return await this.usersRepository.findOne({ uuid });
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
