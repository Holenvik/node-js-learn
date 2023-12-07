import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    return this.productModel.findById(id).exec();
  }
}
