import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CartItemEntity extends Document {
  @Prop({ required: true, type: Object }) // Assuming `product` is an object
  product: Record<string, any>;

  @Prop({ required: true })
  count: number;
}

export const CartItemModel = SchemaFactory.createForClass(CartItemEntity);
