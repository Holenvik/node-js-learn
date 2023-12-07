import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<ProductEntity | null> {
    return this.productRepository.findOne(id);
  }
}
