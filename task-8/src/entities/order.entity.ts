import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CartItemEntity } from './cart-item.entity';

type ORDER_STATUS = 'created' | 'completed';

@Schema()
export class OrderEntity extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  cartId: string;

  @Prop({
    required: true,
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CartItemEntity' }],
  })
  items: CartItemEntity[];

  @Prop({ required: true, type: Object })
  payment: { type: string; address?: any; creditCard?: any };

  @Prop({ required: true, type: Object })
  delivery: { type: string; address: any };

  @Prop({ default: '', type: String })
  comments: string;

  @Prop({ default: 'created', enum: ['created', 'completed'] })
  status: ORDER_STATUS;

  @Prop({ required: true })
  total: number;

  // Add other OrderEntity properties here
}

export const OrderModel = SchemaFactory.createForClass(OrderEntity);

// export interface OrderEntity {
//   id: string; // uuid
//   userId: string;
//   cartId: string;
//   items: CartItemEntity[]; // products from CartEntity
//   payment: {
//     type: string;
//     address?: any;
//     creditCard?: any;
//   };
//   delivery: {
//     type: string;
//     address: any;
//   };
//   comments: string;
//   status: ORDER_STATUS;
//   totalPrice: number;
// }
//
// export const order: OrderEntity = {
//   id: '',
//   userId: '',
//   cartId: '',
//   items: null,
//   payment: {
//     type: 'paypal',
//     address: 'London',
//     creditCard: '1234-1234-1234-1234',
//   },
//   delivery: {
//     type: 'post',
//     address: 'London',
//   },
//   comments: '',
//   status: 'created',
//   totalPrice: 2,
// };
