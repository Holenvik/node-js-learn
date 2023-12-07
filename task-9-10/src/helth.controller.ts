import { Controller, Get } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Controller('health')
export class HealthController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  async checkHealth() {
    try {
      await this.em.getConnection().execute('SELECT 1'); // Execute a simple query to check the database connection
      return { status: 'ok' }; // If the query succeeds, the database connection is healthy
    } catch (error) {
      return { status: 'error', message: 'Database connection error' };
    }
  }
}
