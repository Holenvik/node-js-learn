import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entities/order.entity';
import { OrderRepository } from './order.repository';
import { CartEntity } from '../entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findOne(id: string): Promise<OrderEntity | null> {
    return await this.orderRepository.findOne(id);
  }

  async create(
    userId: string,
    cart: { cart: CartEntity; totalPrice: number },
  ): Promise<OrderEntity> {
    const newOrder: any = {
      userId: userId,
      cartId: cart.cart.userId,
      items: cart.cart.items,
      payment: { type: '' }, // You need to define your payment and delivery details
      delivery: { type: '', address: {} }, // You need to define your payment and delivery details
      comments: '', // Add comments if needed
      status: 'created',
      total: cart.totalPrice,
    };

    return await this.orderRepository.create(newOrder);
  }
}
