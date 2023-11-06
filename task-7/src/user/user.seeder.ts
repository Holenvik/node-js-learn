import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserSeeder {
  constructor(private readonly em: EntityManager) {}

  async seed() {
    // Check if there are already products in the database
    const existingUsers = await this.em.find(User, {});

    if (existingUsers.length === 0) {
      // Create and persist sample products
      const sampleUser: User[] = [
        {
          name: 'Kiryl',
        },
        {
          name: 'Lesha',
        },
        // Add more sample products as needed
      ];

      for (const userData of sampleUser) {
        const user = new User();
        Object.assign(user, userData);
        await this.em.persistAndFlush(user);
      }

      console.log('Sample user seeded.');
    } else {
      console.log('user already exist in the database. Skipping seeding.');
    }
  }
}
