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
exports.KpiInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const kpi_info_entity_1 = require("../entities/kpi-info.entity");
let KpiInfoService = class KpiInfoService {
    constructor(kpiInfoRepository) {
        this.kpiInfoRepository = kpiInfoRepository;
    }
    async findOne(type, language) {
        return this.kpiInfoRepository.findOneBy({ type, language });
    }
    async createKpiInfo(type, title, description, language) {
        const kpiInfo = this.kpiInfoRepository.create({ type, title, description, language });
        return this.kpiInfoRepository.save(kpiInfo);
    }
    async updateKpiInfo(id, dto) {
        const nonEmptyKeys = Object.entries(dto)
            .filter((entry) => (entry === null || entry === void 0 ? void 0 : entry.length) > 1 && entry[1])
            .map(([key]) => key);
        const oldInfo = await this.kpiInfoRepository.findOneBy({ id });
        if (!oldInfo) {
            throw new common_1.NotFoundException();
        }
        const title = nonEmptyKeys.includes('title') ? dto.title : oldInfo.title;
        const type = nonEmptyKeys.includes('type') ? dto.type : oldInfo.type;
        const description = nonEmptyKeys.includes('description') ? dto.description : oldInfo.description;
        const exists = (title == oldInfo.title && description == oldInfo.description && type == oldInfo.type);
        if (exists) {
            throw new common_1.ConflictException();
        }
        await this.kpiInfoRepository.createQueryBuilder().update(kpi_info_entity_1.KpiInfo).set({ title: title, description: description }).where(`id='${id}'`).execute();
        return this.kpiInfoRepository.findOneBy({ id });
    }
    async remove(id) {
        const info = await this.kpiInfoRepository.findOneBy({ id });
        if (!info) {
            throw new common_1.NotFoundException('KPI info Not Found');
        }
        await this.kpiInfoRepository.delete(id);
        return true;
    }
    async getInfo(type, lang) {
        const info = await this.findOne(type, lang);
        if (!info) {
            throw new common_1.NotFoundException('KPI info Not Found');
        }
        return info;
    }
};
KpiInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(kpi_info_entity_1.KpiInfo)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], KpiInfoService);
exports.KpiInfoService = KpiInfoService;
//# sourceMappingURL=kpi-info.service.js.map