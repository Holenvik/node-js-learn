import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { JoiPipeModule } from 'nestjs-joi';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderEntity, OrderModel } from 'src/entities/order.entity';

@Module({
  imports: [
    JoiPipeModule,
    OrderModule,
    MongooseModule.forFeature([{ name: OrderEntity.name, schema: OrderModel }]),
  ],
  providers: [OrderRepository, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
