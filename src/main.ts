import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { document } from './app/parse-yaml';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { MAP_ERRORS } from './utils/const';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, MAP_ERRORS));
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  console.log(`App is listening on ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
