import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { JoiPipeModule } from 'nestjs-joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { OrderModule } from '../order/order.module';
import { Order } from '../entities/order.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JoiPipeModule,
    MikroOrmModule.forFeature({ entities: [Cart, CartItem, Order] }),
    OrderModule,
    UserModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
