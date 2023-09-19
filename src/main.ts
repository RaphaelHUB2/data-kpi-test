import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ShutdownSignal } from '@nestjs/common';
import * as exposePkgInfo from 'pkginfo';
import startApm from '@hub2/nestjs-apm';

import { AppModule } from './app.module';


exposePkgInfo(module, 'version');
startApm();

async function bootstrap() {
  const port: number = Number(process.env.APP_PORT) || 3000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks([ShutdownSignal.SIGTERM]);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  /* Setup swagger */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hub2 Service · data-kpi')
    .setDescription('This service returns kpi to display on the website')
    .setContact('Hub2', 'https://www.hub2.io/', 'contact@hub2.io')
    .setVersion(module.exports.version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, { deepScanRoutes: true });
  SwaggerModule.setup('/docs', app, document, { customSiteTitle: 'Hub2 · data-kpi' });

  await app.listen(port);
}

bootstrap();
