import { Repository } from 'typeorm';
import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { UpdateKpiInfoDto } from '@app/dtos/update-kpi-info.dto';
export declare class KpiInfoService {
    private readonly kpiInfoRepository;
    constructor(kpiInfoRepository: Repository<KpiInfo>);
    findOne(type: KpiEnum, language: string): Promise<KpiInfo | null>;
    createKpiInfo(type: KpiEnum, title: string, description: string, language: string): Promise<KpiInfo>;
    updateKpiInfo(id: number, dto: UpdateKpiInfoDto): Promise<KpiInfo | null>;
    remove(id: number): Promise<boolean>;
    getInfo(type: KpiEnum, lang: string): Promise<KpiInfo>;
}
