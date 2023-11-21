import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderService: OrderService,
  ) {}

  async getCart(
    userId: string,
  ): Promise<{ cart: CartEntity; totalPrice: number }> {
    const cart = await this.cartRepository.findOne(userId);
    let totalPrice = 0;
    if (cart) {
      totalPrice = this.calculateTotalPrice(cart);
    }

    if (!cart) {
      return null;
    }

    const result = {
      cart,
      totalPrice,
    };

    return result;
  }

  async updateCart(
    userId: string,
    cart: CartEntity,
  ): Promise<{ cart: CartEntity; totalPrice: number }> {
    const updatedCart = await this.cartRepository.save(cart);
    const totalPrice = this.calculateTotalPrice(updatedCart);

    const result = {
      cart: updatedCart,
      totalPrice,
    };

    return result;
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.softDelete(userId);
  }

  async createCart(
    userId: string,
  ): Promise<{ cart: CartEntity; totalPrice: number }> {
    const newCart = { id: userId, userId, isDeleted: false, items: [] };
    const cart = await this.cartRepository.save(newCart as any);
    return { cart, totalPrice: 0 };
  }

  private calculateTotalPrice(cart: any): number {
    let result = 0;

    cart.items.forEach((item: any) => {
      result += item.count * item.product.price;
    });

    return result;
  }

  async checkout(userId: string): Promise<OrderEntity> {
    const cartData = await this.getCart(userId);
    if (!cartData) {
      throw new Error('Cart not found');
    }

    return this.orderService.create(userId, cartData);
  }
}
