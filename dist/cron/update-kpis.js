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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKpis = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const nestjs_pino_1 = require("nestjs-pino");
const kpi_service_1 = require("../kpi/kpi.service");
const common_2 = require("@hub2/common");
const api_service_1 = require("../api/api.service");
let UpdateKpis = class UpdateKpis {
    constructor(apiService, kpiService, logger) {
        var _a, _b, _c, _d;
        this.apiService = apiService;
        this.kpiService = kpiService;
        this.logger = logger;
        this.volumeXofId = (_a = process.env.KPI_ID_VOLUME_XOF) !== null && _a !== void 0 ? _a : '';
        if (!this.volumeXofId) {
            throw new common_2.MissingEnvError('KPI_ID_VOLUME_XOF');
        }
        this.lastTransactionDateId = (_b = process.env.KPI_ID_LAST_TRANSACTION) !== null && _b !== void 0 ? _b : '';
        if (!this.lastTransactionDateId) {
            throw new common_2.MissingEnvError('KPI_ID_LAST_TRANSACTION');
        }
        this.paymentSuccessRateId = (_c = process.env.KPI_ID_PAYMENT_SUCCESS_RATE) !== null && _c !== void 0 ? _c : '';
        if (!this.paymentSuccessRateId) {
            throw new common_2.MissingEnvError('KPI_ID_PAYMENT_SUCCESS_RATE');
        }
        this.transferSuccessRateId = (_d = process.env.KPI_ID_TRANSFER_SUCCESS_RATE) !== null && _d !== void 0 ? _d : '';
        if (!this.lastTransactionDateId) {
            throw new common_2.MissingEnvError('KPI_ID_TRANSFER_SUCCESS_RATE');
        }
    }
    async AutoUpdateKpis() {
        try {
            const xofVolume = await this.apiService.get('/kpi/volume-xof');
            await this.updateKpiValue(this.volumeXofId, xofVolume);
        }
        catch (error) {
            this.logger.error({ error }, `Error while updating xof volume`);
        }
        try {
            const lastTransactionDate = await this.apiService.get('/kpi/last-transaction');
            await this.updateKpiValue(this.lastTransactionDateId, new Date(lastTransactionDate).getTime());
        }
        catch (error) {
            this.logger.error({ error }, `Error while updating last transaction date`);
        }
        try {
            const paymentSuccessRate = await this.apiService.get('/kpi/payment-success-rate');
            await this.updateKpiValue(this.paymentSuccessRateId, paymentSuccessRate);
        }
        catch (error) {
            this.logger.error({ error }, `Error while updating payment success rate`);
        }
        try {
            const transferSuccessRate = await this.apiService.get('/kpi/transfer-success-rate');
            await this.updateKpiValue(this.transferSuccessRateId, transferSuccessRate);
        }
        catch (error) {
            this.logger.error({ error }, `Error while updating transfer success rate`);
        }
    }
    async updateKpiValue(id, value) {
        const kpi = {
            id: Number(id),
            value: { value: value },
        };
        const res = await this.kpiService.updateKpi(kpi);
        if (res) {
            this.logger.trace(`New value for ${res.type}: ${res.value.value}`);
            return;
        }
        this.logger.trace(`KPI with id: ${id} not updated`);
    }
};
__decorate([
    (0, schedule_1.Cron)((_a = process.env.CRON_PATTERN_UPDATE_KPI) !== null && _a !== void 0 ? _a : '0 3 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UpdateKpis.prototype, "AutoUpdateKpis", null);
UpdateKpis = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.ApiService,
        kpi_service_1.KpiService,
        nestjs_pino_1.PinoLogger])
], UpdateKpis);
exports.UpdateKpis = UpdateKpis;
//# sourceMappingURL=update-kpis.js.map