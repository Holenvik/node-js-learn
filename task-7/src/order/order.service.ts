import { EntityManager } from '@mikro-orm/core';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class OrderService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string): Promise<Order | null> {
    try {
      return await this.em.findOne(Order, id);
    } catch (e) {
      console.log(e);
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async create(userId: string, cart: Cart, totalPrice: number): Promise<Order> {
    try {
      const order = (await this.findOne(userId)) ?? new Order();

      const newOrder = this.em.assign(order, {
        total: totalPrice,
        userId,
        items: cart.items.map((item) => {
          return { product: item.product, count: item.count };
        }) as any,
        cartId: cart.id,
        comments: 'Added something',
        status: 'created',
      });
      await this.em.persistAndFlush(newOrder);
      return newOrder;
    } catch (e) {
      console.log(e);
      throw new HttpException(`Failed`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
