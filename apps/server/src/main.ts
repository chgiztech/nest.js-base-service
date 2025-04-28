import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/global.config';
import { GlobalExceptionFilter, LoggingInterceptor } from '@utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: (origin, cb) => {
      cb(null, true);
    },
    credentials: true,
  });

  const appConfig = app.get(AppConfig);
  const logger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const globalPrefix = appConfig.APP_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  // Task 2: Middleware implementation
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Task 3: Error handling
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Task: Backend developer (NestJS)')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${globalPrefix}/docs`, app, document);

  await app.listen(appConfig.APP_PORT);
  logger.log(
    `🚀 Application is running on: http://localhost:${appConfig.APP_PORT}/${globalPrefix}/docs`,
  );
}

bootstrap();
