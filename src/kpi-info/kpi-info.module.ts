import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiInfo } from '@app/entities/kpi-info.entity';

import { KpiInfoController } from './kpi-info.controller';
import { KpiInfoService } from './kpi-info.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([KpiInfo]),
  ],
  controllers: [KpiInfoController],
  providers: [KpiInfoService],
})
export class KpiInfoModule { }
