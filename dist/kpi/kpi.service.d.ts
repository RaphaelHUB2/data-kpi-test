import { Repository } from 'typeorm';
import { KPI } from '@app/entities/kpi.entity';
import { KpiDataDto } from '@app/dtos/kpi.dto';
import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { UpdateKpi } from '@app/dtos/update-kpi.dto';
export declare class KpiService {
    private readonly kpiRepository;
    private readonly kpiInfoRepository;
    constructor(kpiRepository: Repository<KPI>, kpiInfoRepository: Repository<KpiInfo>);
    findOne(date: string, type: KpiEnum): Promise<KPI | null>;
    createKpi(date: string, type: KpiEnum, value: any): Promise<KPI>;
    updateKpi(updateDto: UpdateKpi): Promise<KPI | null>;
    remove(id: number): Promise<boolean>;
    getKPI(id: number): Promise<KPI>;
    getListKPI(from?: string, to?: string, type?: KpiEnum[]): Promise<KPI[]>;
    getRawKPI(from: string, to: string, type?: KpiEnum[]): Promise<KpiDataDto>;
    getLatestKPI(from: string, to: string, lang: string): Promise<any[]>;
    private map;
}
