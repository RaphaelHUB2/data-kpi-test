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
exports.KPI = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const kpi_enum_1 = require("../enums/kpi.enum");
let KPI = class KPI {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Automatic generated ID`,
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KPI.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Date of the KPI`,
        example: '2023-02-23T09:28:47.081Z',
    }),
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", String)
], KPI.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Type of the KPI`,
        enum: kpi_enum_1.KpiEnum,
        example: 'volume_xof',
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: kpi_enum_1.KpiEnum,
    }),
    __metadata("design:type", String)
], KPI.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Data for that KPI`,
        example: { value: 2 },
    }),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], KPI.prototype, "value", void 0);
KPI = __decorate([
    (0, typeorm_1.Entity)()
], KPI);
exports.KPI = KPI;
//# sourceMappingURL=kpi.entity.js.map