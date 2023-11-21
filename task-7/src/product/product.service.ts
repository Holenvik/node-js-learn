import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
// import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Product[]> {
    return this.em.find(Product, {});
  }

  async findOne(id: string): Promise<Product | null> {
    return this.em.findOne(Product, id);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    await this.em.persistAndFlush(newProduct);
    return newProduct;
  }

  async update(id: string, product: Product): Promise<Product | null> {
    const existingProduct = await this.em.findOne(Product, id);
    if (!existingProduct) {
      return null; // Product not found
    }

    Object.assign(existingProduct, product);
    await this.em.persistAndFlush(existingProduct);
    return existingProduct;
  }

  async delete(id: string): Promise<void> {
    const productToDelete = await this.em.findOne(Product, id);
    if (productToDelete) {
      this.em.removeAndFlush(productToDelete);
    }
  }
}
