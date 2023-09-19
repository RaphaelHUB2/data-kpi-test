import { I18nContext } from 'nestjs-i18n';
import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { KpiInfoDto } from '@app/dtos/kpi-info.dto';
import { UpdateKpiInfoDto } from '@app/dtos/update-kpi-info.dto';
import { KpiInfoService } from './kpi-info.service';
export declare class KpiInfoController {
    private readonly kpiInfoService;
    constructor(kpiInfoService: KpiInfoService);
    createKpiInfo(i18n: I18nContext, dto: KpiInfoDto): Promise<KpiInfo>;
    updateKPIInfo(id: number, dto: UpdateKpiInfoDto): Promise<KpiInfo | null>;
    deleteKpiInfo(id: number): Promise<boolean>;
    getKPIInfo(i18n: I18nContext, type: KpiEnum): Promise<KpiInfo>;
}
