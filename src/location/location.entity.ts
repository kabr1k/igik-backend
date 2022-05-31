import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import { User } from '../users/user.entity';
import common from '../common/entity.mixin';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Location {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  name: string;
  @ApiProperty()
  @OneToMany(() => User, (user) => user.location)
  users: User[];
}
