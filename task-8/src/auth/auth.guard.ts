import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const userId = request.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException({
        data: null,
        error: {
          message: 'Header x-user-id is missing or no user with such id',
        },
      });
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException({
        data: null,
        error: {
          message: 'User not found',
        },
      });
    }

    return true;
  }
}
