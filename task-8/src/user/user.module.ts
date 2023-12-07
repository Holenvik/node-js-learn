import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserModel } from '../entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserModel }]),
  ],
  providers: [UserRepository],
  exports: [UserRepository, MongooseModule],
})
export class UserModule {}
