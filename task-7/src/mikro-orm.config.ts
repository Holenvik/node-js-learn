import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';

const DbConfig: Options<PostgreSqlDriver> = {
  entities: [User, Product, Cart, CartItem, Order],
  dbName: 'node_gmp',
  type: 'postgresql',
  host: '0.0.0.0',
  user: 'node_gmp',
  password: 'password123',
  debug: true, // Set to false in production
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  logger: console.log.bind(console),
  allowGlobalContext: true,
};

export default DbConfig;
