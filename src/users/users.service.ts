import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }
  async createUser({ email, password, role, name }): Promise<User | null> {
    if (await this.findOne(email)) {
      return null;
    } else {
      return await this.usersRepository.save({
        email,
        role,
        name,
        passwordHash: createHash('sha256').update(password).digest('hex'),
      });
    }
  }
}
