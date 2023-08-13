import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './app/parse-yaml';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { PRISMA_ERR_TO_HTTP_CODES } from './utils/const';
import { getLogLevels } from './utils/logs';
import { processStdinHandler, uncaughtErrorHandler, unhandledRejectionHandler } from './utils/handling-process';
import { AllExceptionsFilter } from './exceptions/all-exceptions';

const { PORT, NODE_ENV } = process.env;

async function bootstrap() {
  process.on('uncaughtExceptionMonitor', uncaughtErrorHandler);
  process.on('unhandledRejection', unhandledRejectionHandler);
  process.stdin.on('data', processStdinHandler);

  const app = await NestFactory.create(AppModule, { logger: getLogLevels(NODE_ENV === 'production') });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter, PRISMA_ERR_TO_HTTP_CODES));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  SwaggerModule.setup('doc', app, document);

  console.log(`App is listening on ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
