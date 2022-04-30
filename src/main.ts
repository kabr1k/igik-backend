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
import { RegisterModule } from './auth/register/register.module';
import { LoginModule } from './auth/login/login.module';
import { MetamaskModule } from './auth/metamask/metamask.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useStaticAssets(join(__dirname, '../..', 'nftfront/dist'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/stocks/views'));
  app.setViewEngine('pug');
  const config = new DocumentBuilder()
    .setTitle('NFT mint')
    .setDescription('NFT-mint internal API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    include: [
      MetamaskModule,
      LoginModule,
      RegisterModule,
      AdminModule,
      PublicModule,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
