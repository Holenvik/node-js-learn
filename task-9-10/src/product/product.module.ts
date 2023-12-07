import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ProductSeeder } from './product.seeder';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Product, User] })],
  providers: [ProductService, UserService, ProductSeeder],
  controllers: [ProductController],
})
export class ProductModule {}
