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
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { SettingsModule } from './settings/settings.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setBaseViewsDir(join(__dirname, '..', 'src/stocks/views'));
  app.useStaticAssets('upload/');
  app.setViewEngine('pug');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Cheer&Earn API')
    .setDescription('Cheer&Earn internal API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    include: [RegisterModule, LoginModule, MetamaskModule, SettingsModule],
  };
  const setupOptions = {
    customSiteTitle: 'Cheer&Earn API docs',
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('v1/api', app, document, setupOptions);
  const configService = app.get(ConfigService);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
