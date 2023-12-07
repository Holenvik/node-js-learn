import { EntityManager } from '@mikro-orm/core';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from 'src/entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { OrderService } from '../order/order.service';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class CartService {
  constructor(
    private readonly orderService: OrderService,
    private readonly em: EntityManager,
  ) {}

  async updateCart(
    userId: string,
    body: Record<string, any>,
  ): Promise<{ cart: Cart; totalPrice: number }> {
    const cart = await this.getCart(userId);

    // Check if the cart exists
    if (!cart) {
      throw new NotFoundException(`Cart for userId ${userId} not found`);
    }
    // Create an array to store the updated cart items
    const updatedItems = [];

    for (const itemData of body.items) {
      const product = await this.em.findOne(Product, {
        id: itemData.productId,
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${itemData.productId} not found`,
        );
      }

      try {
        await this.em.nativeDelete(CartItem, { product });
      } catch (e) {
        throw new HttpException(`Failed`, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Use em.assign to update the cart item with new data
      const cartItem = this.em.assign(new CartItem(), {
        product,
        cart,
        count: itemData.count,
      });

      try {
        await this.em.persistAndFlush(cartItem);
      } catch (e) {
        throw new HttpException(`Failed`, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      updatedItems.push(cartItem);
    }

    // Update the cart's items with the new array of items
    cart.items = updatedItems;

    try {
      await this.em.flush();
    } catch (e) {
      throw new HttpException(`Failed`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const totalPrice = this.calculateTotalPrice(updatedItems);

    return {
      cart: {
        ...cart,
        items: updatedItems.map((item) => {
          return { product: item.product, count: item.count };
        }) as any,
      },
      totalPrice,
    };
  }

  async createCart(
    userId: string,
  ): Promise<{ cart: Cart; totalPrice: number }> {
    const newCart = new Cart();
    newCart.userId = userId;
    newCart.isDeleted = false;
    newCart.items = [];

    try {
      await this.em.transactional(async (em) => {
        em.persist(newCart);
      });
    } catch (e) {
      throw new HttpException(`Failed`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { cart: newCart, totalPrice: 0 };
  }

  async getCart(userId: string): Promise<Cart | null> {
    return await this.em.findOne(Cart, { userId }, { populate: true });
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.em.findOne(Cart, { userId });

    if (cart) {
      cart.items = [];
      await this.em.persistAndFlush(cart);
    }
  }

  async checkout(userId: string): Promise<Order> {
    const cart = await this.getCart(userId);
    const totalPrice = this.calculateTotalPrice(cart.items);
    return this.orderService.create(userId, cart, totalPrice);
  }

  private calculateTotalPrice(
    updatedItems: {
      product: Product;
      count: number;
    }[],
  ): number {
    let result = 0;

    for (const cartItem of updatedItems) {
      result += cartItem.count * cartItem.product.price;
    }

    return result;
  }
}
