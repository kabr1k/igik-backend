import { ColumnOptions, PrimaryColumnOptions } from 'typeorm';

export default class EntityMixin {
  static varcharNullable: ColumnOptions = {
    nullable: true,
    type: 'varchar',
    default: null,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  };
  static textNullable: ColumnOptions = {
    nullable: true,
    type: 'text',
    default: null,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  };
  static charRequired100: PrimaryColumnOptions = {
    nullable: false,
    type: 'varchar',
    length: 100,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  };
  static charRequired256: ColumnOptions = {
    nullable: false,
    type: 'varchar',
    length: 256,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  };
}
