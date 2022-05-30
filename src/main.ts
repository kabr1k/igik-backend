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
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { ConfigService } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { CalendlyModule } from './calendly/calendly.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from './mailer/mailer.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setBaseViewsDir(join(__dirname, '..', 'src/stocks/views'));
  app.useStaticAssets('static/');
  app.setViewEngine('pug');
  const configService = app.get(ConfigService);
  const port = +configService.get('PORT');
  const swagger = +configService.get('SWAGGER');
  if (swagger) {
    const config = new DocumentBuilder()
      .setTitle('Instagig API')
      .setDescription('Instagig internal API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const options: SwaggerDocumentOptions = {
      include: [
        RegisterModule,
        LoginModule,
        UsersModule,
        OrdersModule,
        CalendlyModule,
        PaymentsModule,
        AdminModule,
        MailerModule,
      ],
    };
    const setupOptions = {
      customSiteTitle: 'Instagig API docs',
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('v1/api', app, document, setupOptions);
  }
  await app.listen(port);
}
bootstrap();
