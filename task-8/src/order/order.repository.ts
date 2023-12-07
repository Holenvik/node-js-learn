import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly orderModel: Model<OrderEntity>,
  ) {}

  async findOne(id: string): Promise<OrderEntity | null> {
    return this.orderModel.findById(id).exec();
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }
}
