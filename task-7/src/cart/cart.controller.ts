import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '../entities/cart.entity';
import { AuthenticationGuard } from '../auth/auth.guard';
import * as Joi from 'joi';

@Controller('api/profile/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async getCart(@Headers('x-user-id') userId: string, @Res() res) {
    try {
      const data = await this.cartService.getCart(userId);
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

  @Post()
  @UseGuards(AuthenticationGuard)
  async createCart(@Headers('x-user-id') userId: string, @Res() res) {
    try {
      const data = await this.cartService.createCart(userId);
      res.status(HttpStatus.CREATED).json({ data, error: null });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {
          message: 'Ooops, something went wrong',
        },
      });
    }
  }

  @Put()
  @UseGuards(AuthenticationGuard)
  async updateCart(
    @Headers('x-user-id') userId: string,
    @Res() res,
    @Body() body: Record<string, any>,
  ) {
    // const schema = Joi.object({
    //   id: Joi.string().required(),
    //   items: Joi.array()
    //     .items(
    //       Joi.object({
    //         product: Joi.object({
    //           id: Joi.string().required(),
    //           title: Joi.string().required(),
    //           description: Joi.string().required(),
    //           price: Joi.number().required(),
    //         }).required(),
    //         count: Joi.number().required(),
    //       }),
    //     )
    //     .required(),
    // });
    //
    // let value: Cart = null;
    //
    // try {
    //   value = await schema.validateAsync(cart);
    // } catch (error) {
    //   res.status(HttpStatus.BAD_REQUEST).json({
    //     data: null,
    //     error: {
    //       message: error?.details || 'Ooops, something went wrong',
    //     },
    //   });
    // }

    try {
      const data = await this.cartService.updateCart(userId, body);
      console.dir(data);
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

  @Delete()
  @UseGuards(AuthenticationGuard)
  async deleteCart(@Headers('x-user-id') userId: string, @Res() res) {
    try {
      await this.cartService.clearCart(userId);
      res.status(HttpStatus.OK).json({ data: { success: true }, error: null });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {
          message: 'Ooops, something went wrong',
        },
      });
    }
  }

  @Post('checkout')
  @UseGuards(AuthenticationGuard)
  async checkout(@Headers('x-user-id') userId: string, @Res() res) {
    try {
      const data = await this.cartService.checkout(userId);
      res.status(HttpStatus.CREATED).json({ data, error: null });
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
