import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSeeder } from './product/product.seeder';
import { UserSeeder } from './user/user.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const productSeeder = app.get(ProductSeeder);
  await productSeeder.seed();

  const userSeeder = app.get(UserSeeder);
  await userSeeder.seed();

  await app.listen(3000);
}
bootstrap();
