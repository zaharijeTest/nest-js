import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';
import { PaginationInterceptor } from './shared/interceptors/pagination.interceptor';
import { CustomLoggerService } from './modules/logger/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new PaginationInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter(app.get(CustomLoggerService)));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
