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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class KpiDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Start date for which KPIS are computed`,
        example: `2018-02-23T09:28:47.081Z`,
        required: true,
    }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], KpiDataDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `End date for which KPIS are computed`,
        example: `2023-02-23T09:28:47.081Z`,
        required: true,
    }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], KpiDataDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Mean values of the different KPIS for the given dates`,
        example: {
            "success_rate__transfer_wave_ci": 91.25,
            "success_rate__transfer_orange_ci": 95,
        },
        required: true,
    }),
    __metadata("design:type", Object)
], KpiDataDto.prototype, "kpi", void 0);
exports.KpiDataDto = KpiDataDto;
//# sourceMappingURL=kpi.dto.js.map