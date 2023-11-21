import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey({ type: 'auto' })
  id?: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}
