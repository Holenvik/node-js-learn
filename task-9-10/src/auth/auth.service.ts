import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.verifyPassword(password)) {
      return user;
    }
    return null;
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate a JWT token with a 2-hour expiration (you can adjust the expiresIn value as needed)
    const token = jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: '2h' },
    );

    return token;
  }
}
