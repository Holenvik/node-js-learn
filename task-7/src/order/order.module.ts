import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Order } from '../entities/order.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Order] })],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
