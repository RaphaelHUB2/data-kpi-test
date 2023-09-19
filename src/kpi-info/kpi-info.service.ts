import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { KpiEnum } from '@app/enums/kpi.enum';
import { KpiInfo } from '@app/entities/kpi-info.entity';
import { UpdateKpiInfoDto } from '@app/dtos/update-kpi-info.dto';


@Injectable()
export class KpiInfoService {
  constructor(
    @InjectRepository(KpiInfo) private readonly kpiInfoRepository: Repository<KpiInfo>,
  ) { }

  async findOne(type: KpiEnum, language: string): Promise<KpiInfo | null> {
    return this.kpiInfoRepository.findOneBy({ type, language });
  }

  async createKpiInfo(type: KpiEnum, title: string, description: string, language: string): Promise<KpiInfo> {
    const kpiInfo = this.kpiInfoRepository.create({ type, title, description, language });
    return this.kpiInfoRepository.save(kpiInfo);
  }

  async updateKpiInfo(id: number, dto: UpdateKpiInfoDto): Promise<KpiInfo | null> {
    const nonEmptyKeys = Object.entries(dto)
      .filter((entry) => entry?.length > 1 && entry[1])
      .map(([key]: string[]) => key); //find which field should be updated
    const oldInfo = await this.kpiInfoRepository.findOneBy({ id }); //find the kpi info with the provided id

    //If the kpi info is not found throw an exception
    if (!oldInfo) {
      throw new NotFoundException();
    }

    const title = nonEmptyKeys.includes('title') ? dto.title : oldInfo.title;
    const type = nonEmptyKeys.includes('type') ? dto.type : oldInfo.type;
    const description = nonEmptyKeys.includes('description') ? dto.description : oldInfo.description;
    const exists = (title == oldInfo.title && description == oldInfo.description && type == oldInfo.type);

    //if the kpi info already exists, generate a conflict exception
    if (exists) {
      throw new ConflictException();
    }

    await this.kpiInfoRepository.createQueryBuilder().update(KpiInfo).set({ title: title, description: description }).where(`id='${id}'`).execute();

    return this.kpiInfoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const info = await this.kpiInfoRepository.findOneBy({ id });
    if (!info) {
      throw new NotFoundException('KPI info Not Found');
    }
    await this.kpiInfoRepository.delete(id);
    return true;
  }

  async getInfo(type: KpiEnum, lang: string): Promise<KpiInfo> {
    const info = await this.findOne(type, lang);
    if (!info) {
      throw new NotFoundException('KPI info Not Found');
    }
    return info;
  }
}
