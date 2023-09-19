import * as path from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { generateId } from '@hub2/common';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KPI } from '@app/entities/kpi.entity';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { KpiInfoModule } from '@app/kpi-info/kpi-info.module';
import { KpiModule } from '@app/kpi/kpi.module';
import { CronModule } from './cron/cron.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_PG_HOST,
      port: Number(process.env.DATABASE_PG_PORT),
      username: process.env.DATABASE_PG_DB_USER,
      password: process.env.DATABASE_PG_DB_PASSWORD,
      database: process.env.DATABASE_PG_DB_NAME,
      ssl: process.env.DATABASE_PG_DB_SSL === 'true', // Expected boolean here, but process.env.* provide only strings.
      entities: [KPI, KpiInfo],
      migrations: ['../migrations/*.ts'],
      synchronize: false,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process?.env?.LOG_LEVEL ?? 'trace',
        formatters: {
          level: (label: string) => ({ level: label }),
        },
        genReqId: () => generateId({ prefix: 'req' }),
        quietReqLogger: true,
        redact: ['req.headers.apikey', 'req.headers.authorization'],
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: process.env?.APP_ENV === 'dev',
            singleLine: process.env?.APP_ENV !== 'dev',
          },
        },
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: false,
      },
      resolvers: [
        AcceptLanguageResolver,
      ],
    }),
    CronModule,
    KpiModule,
    KpiInfoModule,
  ],
})
export class AppModule { }
