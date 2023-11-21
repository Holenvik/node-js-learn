import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserEntity extends Document {
  @Prop({ required: true, unique: true })
  id: string;
}

export const UserModel = SchemaFactory.createForClass(UserEntity);

// // export interface UserEntity {
// //   id: string; // uuid
// // }
//
// export const user: UserEntity = {
//   id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
// };
