import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '../dto/registr.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' }) // Add summary for your endpoint
  @ApiResponse({ status: 201, description: 'User registered successfully' }) // Define responses
  @ApiResponse({ status: 500, description: 'User registration failed' }) // Define responses
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const { email, password, role } = registerDto;

      // Check if the email is already in use
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      // Create a new user entity
      const newUser = await this.userService.create({ email, password, role });

      // Return a success message or the new user entity
      return { message: 'User registered successfully', email: newUser.email };
    } catch (error) {
      // Handle errors and return a 500 Internal Server Error response
      throw new InternalServerErrorException(
        'User registration failed',
        error.message,
      );
    }
  }
}
