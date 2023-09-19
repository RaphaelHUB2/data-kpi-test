"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kpi_info_entity_1 = require("../entities/kpi-info.entity");
const kpi_entity_1 = require("../entities/kpi.entity");
const kpi_controller_1 = require("./kpi.controller");
const kpi_service_1 = require("./kpi.service");
let KpiModule = class KpiModule {
};
KpiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([kpi_entity_1.KPI, kpi_info_entity_1.KpiInfo]),
        ],
        controllers: [kpi_controller_1.KpiController],
        providers: [kpi_service_1.KpiService],
        exports: [kpi_service_1.KpiService],
    })
], KpiModule);
exports.KpiModule = KpiModule;
//# sourceMappingURL=kpi.module.js.map