import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminModule } from './admin/admin.module';
import { CalendlyModule } from './calendly/calendly.module';
import { join } from 'path';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
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
import { SsrMiddleware } from './common/ssr.middleware';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            '../..',
            configService.get<string>('PRIVATE_PATH'),
          ),
          serveRoot: '/personal',
        },
      ],
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RegisterModule,
    TicketsModule,
    TextModule,
    LoginModule,
    UsersModule,
    OrdersModule,
    CalendlyModule,
    PaymentsModule,
    // AdminModule,
    SpecialitiesModule,
    CategoriesModule,
    LanguagesModule,
    LocationsModule,
    ExperienceModule,
    SeedModule,
    // PublicModule,
    CrudModule,
  ],
})
export class AppModule implements NestModule {
  constructor(
    private connection: Connection,
    private configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SsrMiddleware).forRoutes('*');
  }
}
