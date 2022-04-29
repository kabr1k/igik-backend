import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findByWallet(walletAddress: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ walletAddress });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }
  async saveUser(user): Promise<User | null> {
    return await this.usersRepository.save(user);
  }
}
