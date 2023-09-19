import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ApiModule } from '@app/api/api.module';
import { KpiModule } from '@app/kpi/kpi.module';
import { UpdateKpis } from './update-kpis';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ApiModule,
    KpiModule,
  ],
  providers: [UpdateKpis],
})
export class CronModule { }
