import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import { User } from '../users/user.entity';
import common from '../common/entity.mixin';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Experience {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty()
  @Column(common.varcharNullable)
  name: string;
  @ApiProperty()
  @Column({ type: 'int', nullable: true, default: 0 })
  ordering: number;
  // @ApiProperty({ type: () => [User] })
  @OneToMany(() => User, (user) => user.experience)
  users: User[];
}
