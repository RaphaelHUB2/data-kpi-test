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
exports.KpiInfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const api_key_guard_1 = require("../guards/api-key.guard");
const bad_request_dto_1 = require("../dtos/bad-request.dto.");
const conflict_dto_1 = require("../dtos/conflict.dto");
const kpi_enum_1 = require("../enums/kpi.enum");
const kpi_info_entity_1 = require("../entities/kpi-info.entity");
const kpi_info_dto_1 = require("../dtos/kpi-info.dto");
const unauthorized_dto_1 = require("../dtos/unauthorized.dto");
const update_kpi_info_dto_1 = require("../dtos/update-kpi-info.dto");
const kpi_info_service_1 = require("./kpi-info.service");
let KpiInfoController = class KpiInfoController {
    constructor(kpiInfoService) {
        this.kpiInfoService = kpiInfoService;
    }
    async createKpiInfo(i18n, dto) {
        const { lang } = i18n;
        const existingKPI = await this.kpiInfoService.findOne(dto.type, lang);
        if (existingKPI) {
            throw new common_1.ConflictException();
        }
        return this.kpiInfoService.createKpiInfo(dto.type, dto.title, dto.description, lang);
    }
    async updateKPIInfo(id, dto) {
        const nonEmptyKeys = Object.entries(dto)
            .filter((entry) => (entry === null || entry === void 0 ? void 0 : entry.length) > 1 && entry[1])
            .map(([key]) => key);
        if (nonEmptyKeys.length == 0) {
            throw new common_1.BadRequestException();
        }
        return this.kpiInfoService.updateKpiInfo(id, dto);
    }
    async deleteKpiInfo(id) {
        return this.kpiInfoService.remove(id);
    }
    async getKPIInfo(i18n, type) {
        const { lang } = i18n;
        return this.kpiInfoService.getInfo(type, lang);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Register KPI infos',
        description: 'Register title and description for a KPI ',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
        { name: 'Accept-Language' },
    ]),
    (0, swagger_1.ApiBody)({
        type: kpi_info_dto_1.KpiInfoDto,
    }),
    (0, swagger_1.ApiConflictResponse)({ type: conflict_dto_1.Conflict, description: 'Conflict' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiCreatedResponse)({ type: kpi_info_dto_1.KpiInfoDto, description: 'Successful request' }),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext,
        kpi_info_dto_1.KpiInfoDto]),
    __metadata("design:returntype", Promise)
], KpiInfoController.prototype, "createKpiInfo", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a KPI infos',
        description: 'Update a KPI info',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiBody)({ type: update_kpi_info_dto_1.UpdateKpiInfoDto }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_info_entity_1.KpiInfo, description: 'Successful request' }),
    (0, swagger_1.ApiConflictResponse)({ type: conflict_dto_1.Conflict, description: 'Conflict' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiExtraModels)(update_kpi_info_dto_1.UpdateKpiInfoDto, kpi_info_entity_1.KpiInfo, bad_request_dto_1.BadRequest, conflict_dto_1.Conflict, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_kpi_info_dto_1.UpdateKpiInfoDto]),
    __metadata("design:returntype", Promise)
], KpiInfoController.prototype, "updateKPIInfo", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a KPI info',
        description: 'Delete a KPI info',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiOkResponse)({ type: Boolean, description: 'Successful request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(bad_request_dto_1.BadRequest, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KpiInfoController.prototype, "deleteKpiInfo", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Display a KPI info',
        description: 'Display a KPI info',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'Accept-Language' },
    ]),
    (0, swagger_1.ApiQuery)({ name: 'type', type: String, example: 'transaction_last_one', description: 'Type of the KPI info to display' }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_info_entity_1.KpiInfo, description: 'Successful request' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(kpi_info_entity_1.KpiInfo, bad_request_dto_1.BadRequest),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __param(1, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext, String]),
    __metadata("design:returntype", Promise)
], KpiInfoController.prototype, "getKPIInfo", null);
KpiInfoController = __decorate([
    (0, common_1.Controller)('/kpi-info'),
    __metadata("design:paramtypes", [kpi_info_service_1.KpiInfoService])
], KpiInfoController);
exports.KpiInfoController = KpiInfoController;
//# sourceMappingURL=kpi-info.controller.js.map