import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';

const DbConfig: Options<PostgreSqlDriver> = {
  entities: [User, Product, Cart, CartItem, Order],
  dbName: process.env.MIKRO_ORM_DB_NAME,
  type: 'postgresql',
  host: process.env.MIKRO_ORM_HOST,
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  debug: true, // Set to false in production
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  logger: console.log.bind(console),
  allowGlobalContext: true,
};

export default DbConfig;
