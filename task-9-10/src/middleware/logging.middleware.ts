// logging.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const elapsed = Date.now() - start;
      this.logger.info(
        `[${req.method}] ${req.path} - ${res.statusCode} (${elapsed}ms)`,
      );
    });

    next();
  }
}
