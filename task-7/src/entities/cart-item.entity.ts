import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { v4 } from 'uuid';

@Entity()
export class CartItem {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  count!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => Cart)
  cart?: Cart; // This property references the owning Cart entity
}
