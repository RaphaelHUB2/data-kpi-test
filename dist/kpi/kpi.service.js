"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const kpi_entity_1 = require("../entities/kpi.entity");
const kpi_enum_1 = require("../enums/kpi.enum");
const kpi_info_entity_1 = require("../entities/kpi-info.entity");
let KpiService = class KpiService {
    constructor(kpiRepository, kpiInfoRepository) {
        this.kpiRepository = kpiRepository;
        this.kpiInfoRepository = kpiInfoRepository;
    }
    async findOne(date, type) {
        return this.kpiRepository.findOneBy({ date, type });
    }
    async createKpi(date, type, value) {
        const kpi = this.kpiRepository.create({ date, type, value });
        return this.kpiRepository.save(kpi);
    }
    async updateKpi(updateDto) {
        const id = updateDto.id;
        const nonEmptyKeys = Object.entries(updateDto)
            .filter((entry) => (entry === null || entry === void 0 ? void 0 : entry.length) > 1 && entry[1])
            .map(([key]) => key);
        const oldKpi = await this.kpiRepository.findOneBy({ id });
        if (!oldKpi) {
            throw new common_1.NotFoundException();
        }
        const date = nonEmptyKeys.includes('date') ? updateDto.date : oldKpi.date;
        const type = nonEmptyKeys.includes('type') ? updateDto.type : oldKpi.type;
        const value = nonEmptyKeys.includes('value') ? updateDto.value : oldKpi.value;
        if (!date || !type) {
            throw new common_1.NotFoundException();
        }
        const exists = await this.findOne(date, type);
        if (exists && exists.id != id) {
            throw new common_1.ConflictException();
        }
        await this.kpiRepository.createQueryBuilder().update(kpi_entity_1.KPI).set({ date: date, type: type, value: value }).where(`id=${id}`).execute();
        return this.kpiRepository.findOneBy({ id });
    }
    async remove(id) {
        const kpi = await this.kpiRepository.findOneBy({ id });
        if (!kpi) {
            throw new common_1.NotFoundException('KPI Not Found');
        }
        await this.kpiRepository.delete(id);
        return true;
    }
    async getKPI(id) {
        const kpi = await this.kpiRepository.findOneBy({ id });
        if (!kpi) {
            throw new common_1.NotFoundException('KPI Not Found');
        }
        return kpi;
    }
    async getListKPI(from, to, type) {
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
    async getRawKPI(from, to, type) {
        const queryBuilder = this.kpiRepository.createQueryBuilder('kpi')
            .where('kpi.date >= :from', { from })
            .andWhere('kpi.date <= :to', { to });
        if (type && type.length > 0) {
            queryBuilder.andWhere('kpi.type IN (:...type)', { type });
        }
        const kpis = await queryBuilder.getMany();
        const result = {};
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
    async getLatestKPI(from, to, lang) {
        const kpiResults = await this.kpiRepository
            .createQueryBuilder('kpi')
            .select('kpi.type', 'type')
            .addSelect(`AVG((kpi.value->>'value')::numeric)`, 'value')
            .where('kpi.date >= :from', { from })
            .andWhere('kpi.date <= :to', { to })
            .groupBy('kpi.type')
            .getRawMany();
        const types = kpiResults.map((kpi) => (kpi.type));
        const kpiInfos = await this.kpiInfoRepository
            .createQueryBuilder('kpi_info')
            .select('kpi_info.title', 'title')
            .addSelect('kpi_info.description', 'description')
            .addSelect('kpi_info.type', 'type')
            .where('kpi_info.language = :lang', { lang })
            .andWhere('kpi_info.type IN (:...types)', { types })
            .getRawMany();
        return kpiResults.map((kpi) => {
            const kpiInfo = kpiInfos.find((info) => info.type === kpi.type);
            return Object.assign(Object.assign(Object.assign({}, kpi), this.map(kpi, lang)), { description: kpiInfo.description, endDate: new Date(to).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }), startDate: new Date(from).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }), title: kpiInfo.title });
        });
    }
    map(result, lang) {
        let value = '';
        switch (result.type) {
            case kpi_enum_1.KpiEnum.TRASACTION_LAST_ONE:
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
};
KpiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kpi_entity_1.KPI)),
    __param(1, (0, typeorm_1.InjectRepository)(kpi_info_entity_1.KpiInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], KpiService);
exports.KpiService = KpiService;
//# sourceMappingURL=kpi.service.js.map