import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import common from '../common/entity.mixin';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.entity';
import { Profiler } from 'inspector';
@Entity()
export class Text {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  text: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  title: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  metaDescription: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  metaTitle: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  slug: string;
}
