import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const user = this.userService.findOne(userId);

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
