import { Injectable } from '@nestjs/common';
import { CartEntity } from '../entities/cart.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartRepository {
  constructor(
    @InjectModel(CartEntity.name)
    private readonly cartModel: Model<CartEntity>,
  ) {}

  async findOne(userId: string): Promise<CartEntity | null> {
    return this.cartModel.findOne({ userId, isDeleted: false }).exec();
  }

  async save(cart: CartEntity): Promise<CartEntity> {
    return this.cartModel
      .findOneAndUpdate({ userId: cart.userId, isDeleted: false }, cart, {
        upsert: true,
        new: true,
      })
      .exec();
  }

  async softDelete(userId: string): Promise<void> {
    await this.cartModel
      .updateOne({ userId, isDeleted: false }, { isDeleted: true })
      .exec();
  }
}
