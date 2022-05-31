import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';
import common from '../common/entity.mixin';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  name: string;
  @ApiProperty()
  @ManyToMany(() => User, (user) => user.categories)
  users: User[];
}
