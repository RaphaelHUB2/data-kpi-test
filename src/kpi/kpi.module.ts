import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiInfo } from '@app/entities/kpi-info.entity';
import { KPI } from '@app/entities/kpi.entity';

import { KpiController } from './kpi.controller';
import { KpiService } from './kpi.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([KPI, KpiInfo]),
  ],
  controllers: [KpiController],
  providers: [KpiService],
  exports: [KpiService],
})
export class KpiModule { }
