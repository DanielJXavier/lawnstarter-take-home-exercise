import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { QueryTrackingInterceptor } from './statistics/query-tracking.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Enable global validation with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Automatically convert types (e.g., string to number)
      },
    }),
  );

  // Enable query tracking interceptor globally
  const queryTrackingInterceptor = app.get(QueryTrackingInterceptor);
  app.useGlobalInterceptors(queryTrackingInterceptor);

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription(
      'A NestJS API that interfaces with SWAPI (Star Wars API) to provide information about Star Wars movies and characters',
    )
    .setVersion('1.0')
    .addTag('search', 'Search for people and movies')
    .addTag('people', 'Get information about Star Wars characters')
    .addTag('movies', 'Get information about Star Wars movies')
    .addTag('statistics', 'Get search query statistics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`API Documentation available at: http://localhost:${port}/api`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
