import { I18nContext } from 'nestjs-i18n';
import { CreateKpi } from '@app/dtos/create-kpi.dto';
import { KPI } from '@app/entities/kpi.entity';
import { KpiDataDto } from '@app/dtos/kpi.dto';
import { KpiEnum } from '@app/enums/kpi.enum';
import { UpdateKpi } from '@app/dtos/update-kpi.dto';
import { KpiService } from './kpi.service';
export declare class KpiController {
    private readonly kpiService;
    private static readonly DEFAULT_LOCALE;
    constructor(kpiService: KpiService);
    createKPI(dto: CreateKpi): Promise<KPI>;
    updateKPI(dto: UpdateKpi): Promise<KPI | null>;
    deleteKPI(id: number): Promise<boolean>;
    getKPI(id: number): Promise<KPI>;
    getKPIList(from?: string, to?: string, type?: KpiEnum): Promise<KPI[]>;
    getLatestKPI(i18n: I18nContext): Promise<any[]>;
    getPrivateKPI(i18n: I18nContext): Promise<any[]>;
    getKPIRaw(): Promise<KpiDataDto>;
}
