import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductSeeder {
  constructor(private readonly em: EntityManager) {}

  async seed() {
    // Check if there are already products in the database
    const existingProducts = await this.em.find(Product, {});

    if (existingProducts.length === 0) {
      // Create and persist sample products
      const sampleProducts: Product[] = [
        {
          title: 'Product 1',
          description: 'Description of Product 1',
          price: 10.99,
        },
        {
          title: 'Product 2',
          description: 'Description of Product 2',
          price: 19.99,
        },
        // Add more sample products as needed
      ];

      for (const productData of sampleProducts) {
        const product = new Product();
        product.id = uuid(); // Generate a UUID
        Object.assign(product, productData);
        await this.em.persistAndFlush(product);
      }

      console.log('Sample products seeded.');
    } else {
      console.log('Products already exist in the database. Skipping seeding.');
    }
  }
}
