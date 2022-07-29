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
import { SpecialitiesModule } from './speciality/specialities.module';
import { CategoriesModule } from './category/categories.module';
import { LanguagesModule } from './languages/languages.module';
import { LocationsModule } from './location/locations.module';
import { ExperienceModule } from './experience/experience.module';
import { SeedModule } from './seed/seed.module';
import { PublicModule } from './public/public.module';
import { TextModule } from './text/text.module';
import { TicketsModule } from './tickets/tickets.module';
import { CrudModule } from './crud/crud.module';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get('PORT');
  const swagger = +configService.get('SWAGGER');
  app.enableCors();
  app.useStaticAssets(
    join(__dirname, '../..', configService.get('PRIVATE_PATH')),
    { index: false },
  );
  app.useStaticAssets(
    join(
      __dirname,
      '../..',
      configService.get<string>('FRONTEND_PATH') + '/client/',
    ),
  );
  app.useStaticAssets('static/');
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setBaseViewsDir(join(__dirname, '..', 'src/stocks/views'));
  app.setViewEngine('pug');
  if (swagger) {
    const config = new DocumentBuilder()
      .setTitle('iGik API')
      .setDescription('iGik internal API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const options: SwaggerDocumentOptions = {
      include: [
        RegisterModule,
        TextModule,
        TicketsModule,
        LoginModule,
        UsersModule,
        OrdersModule,
        CalendlyModule,
        PaymentsModule,
        AdminModule,
        MailerModule,
        SpecialitiesModule,
        CategoriesModule,
        LanguagesModule,
        LocationsModule,
        ExperienceModule,
        SeedModule,
        PublicModule,
        CrudModule,
      ],
    };
    const setupOptions = {
      customSiteTitle: 'I-gik API docs',
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api/v1', app, document, setupOptions);
  }
  await app.listen(port);
}
bootstrap();
