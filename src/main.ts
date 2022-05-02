import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { join } from 'path';
import { MetamaskModule } from './auth/metamask/metamask.module';
import { AdminModule } from './admin/admin.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'dist2'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/stocks/views'));
  app.setViewEngine('pug');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Cheer&Earn API')
    .setDescription('Cheer&Earn internal API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    include: [MetamaskModule, AdminModule],
  };
  const setupOptions = {
    customSiteTitle: 'Cheer&Earn API docs',
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('v1/api', app, document, setupOptions);
  await app.listen(3000);
}
bootstrap();
