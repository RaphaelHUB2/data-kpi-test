import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KPI } from '@app/entities/kpi.entity';
import { KpiDataDto } from '@app/dtos/kpi.dto';
import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { UpdateKpi } from '@app/dtos/update-kpi.dto';


@Injectable()
export class KpiService {
  constructor(
    @InjectRepository(KPI) private readonly kpiRepository: Repository<KPI>,
    @InjectRepository(KpiInfo) private readonly kpiInfoRepository: Repository<KpiInfo>,
  ) { }

  async findOne(date: string, type: KpiEnum): Promise<KPI | null> {
    return this.kpiRepository.findOneBy({ date, type });
  }

  async createKpi(date: string, type: KpiEnum, value: any): Promise<KPI> {
    const kpi = this.kpiRepository.create({ date, type, value });
    return this.kpiRepository.save(kpi);
  }

  async updateKpi(updateDto: UpdateKpi): Promise<KPI | null> {
    const id = updateDto.id;
    const nonEmptyKeys = Object.entries(updateDto)
      .filter((entry) => entry?.length > 1 && entry[1])
      .map(([key]: string[]) => key); //find which field should be updated
    const oldKpi = await this.kpiRepository.findOneBy({ id }); //find the kpi with the provided id

    //If the kpi is not found throw an exception
    if (!oldKpi) {
      throw new NotFoundException();
    }

    const date = nonEmptyKeys.includes('date') ? updateDto.date : oldKpi.date;
    const type = nonEmptyKeys.includes('type') ? updateDto.type : oldKpi.type;
    const value = nonEmptyKeys.includes('value') ? updateDto.value : oldKpi.value;

    /* Avoid lint errors */
    if (!date || !type) {
      throw new NotFoundException();
    }

    //if data+type exists, we check if the id differs. If no, we update the kpi, else conflict exception is thrown
    const exists = await this.findOne(date, type);

    if (exists && exists.id != id) {
      throw new ConflictException();
    }
    await this.kpiRepository.createQueryBuilder().update(KPI).set({ date: date, type: type, value: value }).where(`id=${id}`).execute();

    return this.kpiRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const kpi = await this.kpiRepository.findOneBy({ id });
    if (!kpi) {
      throw new NotFoundException('KPI Not Found');
    }
    await this.kpiRepository.delete(id);
    return true;
  }

  async getKPI(id: number): Promise<KPI> {
    const kpi = await this.kpiRepository.findOneBy({ id });
    if (!kpi) {
      throw new NotFoundException('KPI Not Found');
    }
    return kpi;
  }

  async getListKPI(from?: string, to?: string, type?: KpiEnum[]): Promise<KPI[]> {
    const queryBuilder = this.kpiRepository.createQueryBuilder('kpi');

    if (from) {
      queryBuilder.andWhere('kpi.date >= :from', { from });
    }

    if (to) {
      queryBuilder.andWhere('kpi.date <= :to', { to });
    }

    if (type && type.length > 0) {
      queryBuilder.andWhere('kpi.type IN (:...type)', { type });
    }

    return queryBuilder.getMany();
  }

  async getRawKPI(from: string, to: string, type?: KpiEnum[]): Promise<KpiDataDto> {
    const queryBuilder = this.kpiRepository.createQueryBuilder('kpi')
      .where('kpi.date >= :from', { from })
      .andWhere('kpi.date <= :to', { to });

    if (type && type.length > 0) {
      queryBuilder.andWhere('kpi.type IN (:...type)', { type });
    }

    const kpis: KPI[] = await queryBuilder.getMany();
    const result: Record<KpiEnum, any> = {} as Record<KpiEnum, any>;

    if (kpis.length > 0) {
      const groupedByType = kpis.reduce((acc, kpi) => {
        const keyType = kpi.type;
        if (!acc[keyType]) {
          acc[keyType] = [];
        }
        acc[keyType].push(kpi.value.value);
        return acc;
      }, {});
      const keys = Object.keys(groupedByType);

      for (const key of keys) {
        let sum = 0;
        for (const i of groupedByType[key]) {
          sum = sum + i;
        }
        result[key] = sum / groupedByType[key].length;
      }
    }
    return {
      startDate: from,
      endDate: to,
      kpi: result,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getLatestKPI(from: string, to: string, lang: string): Promise<any[]> {

    //fetch kpi with their average
    const kpiResults = await this.kpiRepository
      .createQueryBuilder('kpi')
      .select('kpi.type', 'type')
      .addSelect(`AVG((kpi.value->>'value')::numeric)`, 'value')
      .where('kpi.date >= :from', { from })
      .andWhere('kpi.date <= :to', { to })
      .groupBy('kpi.type')
      .getRawMany();

    //values are already grouped by type so are already unique
    const types = kpiResults.map((kpi) => (kpi.type));

    //fetch kpiInfos only for types retrieved previously
    const kpiInfos = await this.kpiInfoRepository
      .createQueryBuilder('kpi_info')
      .select('kpi_info.title', 'title')
      .addSelect('kpi_info.description', 'description')
      .addSelect('kpi_info.type', 'type')
      .where('kpi_info.language = :lang', { lang })
      .andWhere('kpi_info.type IN (:...types)', { types })
      .getRawMany();

      //maps kpi.type with kpiInfo.type to display the right infos for each kpi
    return kpiResults.map((kpi) => {
      const kpiInfo = kpiInfos.find((info) => info.type === kpi.type);
      return {
        ...kpi,
        ...this.map(kpi, lang),
        description: kpiInfo.description,
        endDate: new Date(to).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }),
        startDate: new Date(from).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }),
        title: kpiInfo.title,
      };
    });
  }

  private map(result, lang) {
    let value = '';

    switch (result.type) {
      case KpiEnum.TRASACTION_LAST_ONE:
        value = new Date(parseInt(result.value, 10)).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' });
        break;
      default:
        value = new Intl.NumberFormat(lang).format(result.value);
        break;
    }

    return {
      value,
    };
  }
}
