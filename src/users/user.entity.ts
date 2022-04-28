import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import common from '../common/entity.mixin';

@Entity()
export class User {
  @PrimaryColumn(common.charRequired100)
  email: string;
  @Column({ default: true })
  enabled: boolean;
  @Column(common.varcharNullable)
  name: string;
  @Column(common.varcharNullable)
  role: string;
  @Column(common.charRequired256)
  passwordHash: string;
}
