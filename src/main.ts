import { UnauthorizedInterceptor } from '@common/errors/interceptors/unahorized.interceptor';
import { DatabaseInterceptor } from '@common/errors/interceptors/database.interceptor';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
