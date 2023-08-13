import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeLogs } from 'src/utils/logs';

@Injectable()
export default class LoggingService implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, params, url } = request;
      const { statusCode, statusMessage } = response;
      const message = `${method} ${url} ${params.id ?? 'no params'} ${statusMessage}`;
      let type;

      if (statusCode >= 500) {
        type = 'error';
        writeLogs(`HTTP ${type} ${message}`);
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        type = 'warn';
        writeLogs(`HTTP ${type} ${message}`);
        return this.logger.warn(message);
      }
      type = 'log';
      writeLogs(`HTTP ${type} ${message}`);
      return this.logger.log(message);
    });

    next();
  }
}
