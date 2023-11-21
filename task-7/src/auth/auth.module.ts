import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './auth.guard';

@Module({
  providers: [AuthenticationGuard],
})
export class ProductModule {}
