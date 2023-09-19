import { KpiEnum } from '@app/enums/kpi.enum';
export declare class KpiDataDto {
    startDate: string;
    endDate: string;
    kpi: Record<KpiEnum, any>;
}
