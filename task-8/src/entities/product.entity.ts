import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductEntity extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  // Add other ProductEntity properties here
}

export const ProductModel = SchemaFactory.createForClass(ProductEntity);

// export interface ProductEntity {
//   id: string; // uuid
//   title: string;
//   description: string;
//   price: number;
// }
//
// export const product: ProductEntity = {
//   id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
//   title: 'Book',
//   description: 'A very interesting book',
//   price: 100,
// };
