import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductList(@Res() res) {
    try {
      const data = await this.productService.findAll();
      res.status(HttpStatus.OK).json({ data, error: null });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {
          message: 'Ooops, something went wrong',
        },
      });
    }
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: string,
    @Res() res,
  ): Promise<Product | null> {
    try {
      const data = await this.productService.findOne(id);

      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          error: {
            message: 'No product with such id',
          },
        });
        return;
      }

      res.status(HttpStatus.OK).json({ data, error: null });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {
          message: 'Ooops, something went wrong',
        },
      });
    }
  }
}
