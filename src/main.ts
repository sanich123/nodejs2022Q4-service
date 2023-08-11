import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './app/parse-yaml';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { MAP_ERRORS } from './utils/const';
import { getLogLevels } from './utils/log-levels';
import { processStdinHandler, uncaughtErrorHandler, unhandledRejectionHandler } from './utils/utils';
import { AllExceptionsFilter } from './exceptions-filter/exceptions-filter';

const { PORT, NODE_ENV } = process.env;

async function bootstrap() {
  process.on('uncaughtException', uncaughtErrorHandler);
  process.on('unhandledRejection', unhandledRejectionHandler);
  process.stdin.on('data', processStdinHandler);
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
  });

  const isProduction = NODE_ENV === 'production';
  const app = await NestFactory.create(AppModule, { logger: getLogLevels(isProduction) });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter, MAP_ERRORS));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  SwaggerModule.setup('doc', app, document);

  console.log(`App is listening on ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
