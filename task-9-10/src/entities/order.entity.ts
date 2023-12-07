import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItem } from './cart-item.entity';
import { v4 } from 'uuid';

@Entity()
export class Order {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  userId!: string;

  @Property()
  cartId!: string;

  @Property({ type: 'json' })
  items: CartItem[] = [];

  @Property({ type: 'json' })
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  } = { type: '', address: {}, creditCard: {} };

  @Property({ type: 'json' })
  delivery: {
    type: string;
    address: any;
  } = { type: '', address: {} };

  @Property()
  comments!: string;

  @Property()
  status!: string;

  @Property()
  total!: number;
}
