import { PinoLogger } from 'nestjs-pino';
import { KpiService } from '@app/kpi/kpi.service';
import { ApiService } from '../api/api.service';
export declare class UpdateKpis {
    private readonly apiService;
    private readonly kpiService;
    private readonly logger;
    private readonly volumeXofId;
    private readonly lastTransactionDateId;
    private readonly paymentSuccessRateId;
    private readonly transferSuccessRateId;
    constructor(apiService: ApiService, kpiService: KpiService, logger: PinoLogger);
    AutoUpdateKpis(): Promise<void>;
    private updateKpiValue;
}
