import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserModel } from './entities/user.entity';

@Module({
  providers: [],
  imports: [
    CartModule,
    OrderModule,
    ProductModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserModel }]),
  ],
})
export class AppModule {}
