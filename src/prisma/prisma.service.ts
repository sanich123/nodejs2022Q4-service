import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PRISMA_LEVELS } from 'src/utils/const';
import { writeLogs } from 'src/utils/logs';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({ log: PRISMA_LEVELS });
  }
  async onModuleInit() {
    await this.$connect();
    this.$use(this.loggingMiddleware);
    this.$on('error', ({ message }) => this.logger.error(message));
    this.$on('warn', ({ message }) => this.logger.warn(message));
    this.$on('info', ({ message }) => this.logger.debug(message));
    this.$on('query', ({ query, params }) => this.logger.log(`${query}; ${params}`));
  }

  categorySoftDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }
    return next(params);
  };

  loggingMiddleware: Prisma.Middleware = async (params, next) => {
    const logIinfo = `${params.action} ${params.model} ${JSON.stringify(params.args)}`;
    this.logger.log(logIinfo);
    writeLogs(logIinfo);
    const result = await next(params);
    this.logger.log(result);
    return result;
  };

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
