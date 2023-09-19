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
exports.UpdateKpi = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const kpi_enum_1 = require("../enums/kpi.enum");
class UpdateKpi {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Id of the KPI to update`,
        example: 2,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateKpi.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Date of the KPI`,
        example: `2023-02-23T09:28:47.081Z`,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], UpdateKpi.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Type of the KPI`,
        example: 'volume_xof',
        enum: kpi_enum_1.KpiEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(kpi_enum_1.KpiEnum),
    __metadata("design:type", String)
], UpdateKpi.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Value of the KPI`,
        example: { value: 2 },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateKpi.prototype, "value", void 0);
exports.UpdateKpi = UpdateKpi;
//# sourceMappingURL=update-kpi.dto.js.map