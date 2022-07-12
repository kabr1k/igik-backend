import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
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
  @OneToMany(() => User, (user) => user.category)
  users: User[];
  @ApiProperty()
  @Column(common.varcharNullable)
  imagePath: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  slug: string;
}
