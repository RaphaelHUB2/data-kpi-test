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
var KpiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const api_key_guard_1 = require("../guards/api-key.guard");
const bad_request_dto_1 = require("../dtos/bad-request.dto.");
const conflict_dto_1 = require("../dtos/conflict.dto");
const create_kpi_dto_1 = require("../dtos/create-kpi.dto");
const kpi_entity_1 = require("../entities/kpi.entity");
const kpi_dto_1 = require("../dtos/kpi.dto");
const kpi_enum_1 = require("../enums/kpi.enum");
const unauthorized_dto_1 = require("../dtos/unauthorized.dto");
const update_kpi_dto_1 = require("../dtos/update-kpi.dto");
const kpi_service_1 = require("./kpi.service");
let KpiController = KpiController_1 = class KpiController {
    constructor(kpiService) {
        this.kpiService = kpiService;
    }
    async createKPI(dto) {
        const existingKPI = await this.kpiService.findOne(dto.date, dto.type);
        if (existingKPI) {
            throw new common_1.ConflictException();
        }
        return this.kpiService.createKpi(dto.date, dto.type, dto.value);
    }
    async updateKPI(dto) {
        const nonEmptyKeys = Object.entries(dto)
            .filter((entry) => (entry === null || entry === void 0 ? void 0 : entry.length) > 1 && entry[1])
            .map(([key]) => key);
        if (nonEmptyKeys.length < 2) {
            throw new common_1.BadRequestException();
        }
        return this.kpiService.updateKpi(dto);
    }
    async deleteKPI(id) {
        return this.kpiService.remove(id);
    }
    async getKPI(id) {
        return this.kpiService.getKPI(id);
    }
    async getKPIList(from, to, type) {
        if (!from || !to) {
            throw new common_1.BadRequestException();
        }
        return type
            ? this.kpiService.getListKPI(from, to, [type])
            : this.kpiService.getListKPI(from, to);
    }
    async getLatestKPI(i18n) {
        const { lang } = i18n;
        const from = new Date('1970-01-01 00:00:00.000+00');
        const now = new Date();
        return this.kpiService.getLatestKPI(from.toISOString(), now.toISOString(), lang);
    }
    async getPrivateKPI(i18n) {
        const { lang } = i18n;
        const from = new Date('1970-01-01 00:00:00.000+00');
        const now = new Date();
        return this.kpiService.getLatestKPI(from.toISOString(), now.toISOString(), lang);
    }
    async getKPIRaw() {
        const from = new Date('1970-01-01 00:00:00.000+00');
        const now = new Date();
        const allTypes = Object.values(kpi_enum_1.KpiEnum);
        return this.kpiService.getRawKPI(from.toISOString(), now.toISOString(), allTypes);
    }
};
KpiController.DEFAULT_LOCALE = 'en';
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a KPI',
        description: 'Create a KPI for display',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiBody)({
        type: create_kpi_dto_1.CreateKpi,
    }),
    (0, swagger_1.ApiConflictResponse)({ type: conflict_dto_1.Conflict, description: 'Conflict' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiCreatedResponse)({ type: kpi_entity_1.KPI, description: 'Successful request' }),
    (0, swagger_1.ApiExtraModels)(create_kpi_dto_1.CreateKpi, kpi_entity_1.KPI, bad_request_dto_1.BadRequest, conflict_dto_1.Conflict, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kpi_dto_1.CreateKpi]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "createKPI", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a KPI',
        description: 'Update a KPI for display',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiBody)({ type: update_kpi_dto_1.UpdateKpi }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_entity_1.KPI, description: 'Successful request' }),
    (0, swagger_1.ApiConflictResponse)({ type: conflict_dto_1.Conflict, description: 'Conflict' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiExtraModels)(update_kpi_dto_1.UpdateKpi, kpi_entity_1.KPI, bad_request_dto_1.BadRequest, conflict_dto_1.Conflict, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_kpi_dto_1.UpdateKpi]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "updateKPI", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a KPI',
        description: 'Delete a KPI',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiQuery)({ name: 'id', type: Number, example: 2, description: 'Id of the KPI to delete' }),
    (0, swagger_1.ApiOkResponse)({ type: Boolean, description: 'Successful request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(bad_request_dto_1.BadRequest, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "deleteKPI", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Display a KPI',
        description: 'Display a KPI',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiQuery)({ name: 'id', type: Number, example: 2, description: 'Id of the KPI to display' }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_entity_1.KPI, description: 'Successful request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(kpi_entity_1.KPI, bad_request_dto_1.BadRequest, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "getKPI", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({
        summary: 'Display a KPI List',
        description: 'Display the KPI List for the given dates and type',
    }),
    (0, swagger_1.ApiHeaders)([
        { name: 'x-api-key' },
    ]),
    (0, swagger_1.ApiQuery)({ name: 'from', type: Date, description: 'The start date in ISO8601 format', example: '2020-02-23T09:28:47.081Z' }),
    (0, swagger_1.ApiQuery)({ name: 'to', type: Date, description: 'The end date in ISO8601 format', example: '2023-02-23T09:28:47.081Z' }),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: kpi_enum_1.KpiEnum, description: 'Type of the KPI to display' }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_entity_1.KPI, isArray: true, description: 'Successful request' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: unauthorized_dto_1.Unauthorized, description: 'Unauthorized' }),
    (0, swagger_1.ApiExtraModels)(kpi_entity_1.KPI, bad_request_dto_1.BadRequest, unauthorized_dto_1.Unauthorized),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "getKPIList", null);
__decorate([
    (0, common_1.Get)('/latest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Display mean values for all KPI',
        description: `Display mean values for all registered KPI since 1970.`,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Accept-Language',
        description: `Language used to format response data`,
        example: KpiController_1.DEFAULT_LOCALE,
        required: false,
    }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_dto_1.KpiDataDto, description: 'Successful request' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(kpi_dto_1.KpiDataDto, bad_request_dto_1.BadRequest),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "getLatestKPI", null);
__decorate([
    (0, common_1.Get)('/private'),
    (0, swagger_1.ApiOperation)({
        summary: 'Display private KPIs',
        description: `Display private KPIs.`,
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Accept-Language',
        description: `Language used to format response data`,
        example: KpiController_1.DEFAULT_LOCALE,
        required: false,
    }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_dto_1.KpiDataDto, description: 'Successful request' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(kpi_dto_1.KpiDataDto, bad_request_dto_1.BadRequest),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, nestjs_i18n_1.I18n)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nContext]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "getPrivateKPI", null);
__decorate([
    (0, common_1.Get)('/raw'),
    (0, swagger_1.ApiOperation)({
        summary: 'Display mean values for all KPI',
        description: `Display mean values for all registered KPI since 1970. If a KPI is NotFoundException
    displayed, it means it has not been registered yet`,
    }),
    (0, swagger_1.ApiOkResponse)({ type: kpi_dto_1.KpiDataDto, description: 'Successful request' }),
    (0, swagger_1.ApiBadRequestResponse)({ type: bad_request_dto_1.BadRequest, description: 'Bad Request' }),
    (0, swagger_1.ApiExtraModels)(kpi_dto_1.KpiDataDto, bad_request_dto_1.BadRequest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "getKPIRaw", null);
KpiController = KpiController_1 = __decorate([
    (0, common_1.Controller)('kpi'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [kpi_service_1.KpiService])
], KpiController);
exports.KpiController = KpiController;
//# sourceMappingURL=kpi.controller.js.map