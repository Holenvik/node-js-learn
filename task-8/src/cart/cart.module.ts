import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { UserRepository } from '../user/user.repository';
import { JoiPipeModule } from 'nestjs-joi';
import { OrderModule } from '../order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartEntity, CartModel } from '../entities/cart.entity';
import { CartItemEntity, CartItemModel } from '../entities/cart-item.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JoiPipeModule,
    OrderModule,
    MongooseModule.forFeature([
      { name: CartItemEntity.name, schema: CartItemModel },
      { name: CartEntity.name, schema: CartModel },
    ]),
    UserModule,
  ],
  providers: [CartService, CartRepository, UserRepository],
  controllers: [CartController],
})
export class CartModule {}
