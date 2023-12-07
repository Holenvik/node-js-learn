import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.body;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // If authentication succeeds, generate a JWT token
    const jwtToken = await this.authService.generateJwtToken(user);

    // Return the JWT token to the client
    return { token: jwtToken };
  }
}
