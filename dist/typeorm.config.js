"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const kpi_info_entity_1 = require("./entities/kpi-info.entity");
const kpi_entity_1 = require("./entities/kpi.entity");
const datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.DATABASE_PG_HOST) !== null && _b !== void 0 ? _b : 'postgres',
    port: Number((_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.DATABASE_PG_PORT) !== null && _d !== void 0 ? _d : 5432),
    username: process.env.DATABASE_PG_DB_USER,
    password: process.env.DATABASE_PG_DB_PASSWORD,
    database: process.env.DATABASE_PG_DB_NAME,
    ssl: process.env.DATABASE_PG_DB_SSL === 'true',
    entities: [kpi_entity_1.KPI, kpi_info_entity_1.KpiInfo],
    migrations: ['**/migrations/*.ts'],
});
exports.default = datasource;
//# sourceMappingURL=typeorm.config.js.map