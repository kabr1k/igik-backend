import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    return await this.usersRepository.save(profile);
  }
}
