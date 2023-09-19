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
exports.UpdateKpiInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const kpi_enum_1 = require("../enums/kpi.enum");
class UpdateKpiInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Type of the KPI`,
        enum: kpi_enum_1.KpiEnum,
        example: 'success_rate__transfer_orange_ci',
    }),
    __metadata("design:type", String)
], UpdateKpiInfoDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Title`,
        example: 'Success Rate - PAY-OUT Orange CI',
    }),
    __metadata("design:type", String)
], UpdateKpiInfoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `Description`,
        example: 'This is the success rate for PAY-OUT using the Orange CI provider',
    }),
    __metadata("design:type", String)
], UpdateKpiInfoDto.prototype, "description", void 0);
exports.UpdateKpiInfoDto = UpdateKpiInfoDto;
//# sourceMappingURL=update-kpi-info.dto.js.map