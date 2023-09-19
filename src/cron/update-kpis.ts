import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';

import { KpiService } from '@app/kpi/kpi.service';
import { MissingEnvError } from '@hub2/common';
import { UpdateKpi } from '@app/dtos/update-kpi.dto';
import { ApiService } from '../api/api.service';


@Injectable()
export class UpdateKpis {

  private readonly volumeXofId: string;
  private readonly lastTransactionDateId: string;
  private readonly paymentSuccessRateId: string;
  private readonly transferSuccessRateId: string;

  constructor(
    private readonly apiService: ApiService,
    private readonly kpiService: KpiService,
    private readonly logger: PinoLogger,
  ) {
    this.volumeXofId = process.env.KPI_ID_VOLUME_XOF ?? '';
    if (!this.volumeXofId) {
      throw new MissingEnvError('KPI_ID_VOLUME_XOF');
    }

    this.lastTransactionDateId = process.env.KPI_ID_LAST_TRANSACTION ?? '';
    if (!this.lastTransactionDateId) {
      throw new MissingEnvError('KPI_ID_LAST_TRANSACTION');
    }

    this.paymentSuccessRateId = process.env.KPI_ID_PAYMENT_SUCCESS_RATE ?? '';
    if (!this.paymentSuccessRateId) {
      throw new MissingEnvError('KPI_ID_PAYMENT_SUCCESS_RATE');
    }

    this.transferSuccessRateId = process.env.KPI_ID_TRANSFER_SUCCESS_RATE ?? '';
    if (!this.lastTransactionDateId) {
      throw new MissingEnvError('KPI_ID_TRANSFER_SUCCESS_RATE');
    }
  }

  // Every monday at 03:00
  @Cron(process.env.CRON_PATTERN_UPDATE_KPI ?? '0 3 * * *')
  async AutoUpdateKpis() {

    try {
      // execute sequentially to avoid performance issue as there is a lot of data in the db
      const xofVolume: number = await this.apiService.get('/kpi/volume-xof');
      await this.updateKpiValue(this.volumeXofId, xofVolume);
    } catch (error) {
      this.logger.error({ error }, `Error while updating xof volume`);
    }

    try {
      const lastTransactionDate: string = await this.apiService.get('/kpi/last-transaction');
      await this.updateKpiValue(this.lastTransactionDateId, new Date(lastTransactionDate).getTime());
    } catch (error) {
      this.logger.error({ error }, `Error while updating last transaction date`);
    }

    try {
      const paymentSuccessRate: number = await this.apiService.get('/kpi/payment-success-rate');
      await this.updateKpiValue(this.paymentSuccessRateId, paymentSuccessRate);
    } catch (error) {
      this.logger.error({ error }, `Error while updating payment success rate`);
    }

    try {
      const transferSuccessRate: number = await this.apiService.get('/kpi/transfer-success-rate');
      await this.updateKpiValue(this.transferSuccessRateId, transferSuccessRate);
    } catch (error) {
      this.logger.error({ error }, `Error while updating transfer success rate`);
    }

  }

  private async updateKpiValue(id: string, value: number): Promise<void> {
    const kpi: UpdateKpi = {
      id: Number(id),
      value: { value: value },
    };
    const res = await this.kpiService.updateKpi(kpi);
    if (res) {
      this.logger.trace(`New value for ${res.type}: ${res.value.value}`);
      return;
    }
    this.logger.trace(`KPI with id: ${id} not updated`);
  }
}
