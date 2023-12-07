import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from '../entities/order.entity';
import { LoggerService } from '../logger.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Order] })],
  providers: [OrderService, LoggerService],
  exports: [OrderService],
})
export class OrderModule {}
