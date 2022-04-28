import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';
import common from '../../common/entity.mixin';

@Entity()
export class Coin {
  @PrimaryColumn(common.charRequired100)
  symbol: string;
  @Column({ default: true })
  enabled: boolean;
  @Column(common.varcharNullable)
  // название монеты - Stellar
  name: string;
  @Column('boolean')
  // может использоваться как базисная валюта
  basis: boolean;
}
