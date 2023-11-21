import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItem } from './cart-item.entity';
import { v4 } from 'uuid';

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ fieldName: 'user_id' })
  userId!: string;

  @Property({ fieldName: 'is_deleted' })
  isDeleted!: boolean;

  @OneToMany(() => CartItem, (item) => item.cart)
  items = new Array<CartItem>();
}
