import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}
  async findById(id: string): Promise<UserEntity> {
    return this.userModel.findById(id).exec();
  }
}
