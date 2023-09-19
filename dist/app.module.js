"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
const common_1 = require("@hub2/common");
const nestjs_pino_1 = require("nestjs-pino");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kpi_entity_1 = require("./entities/kpi.entity");
const kpi_info_entity_1 = require("./entities/kpi-info.entity");
const kpi_info_module_1 = require("./kpi-info/kpi-info.module");
const kpi_module_1 = require("./kpi/kpi.module");
const cron_module_1 = require("./cron/cron.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_2.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_PG_HOST,
                port: Number(process.env.DATABASE_PG_PORT),
                username: process.env.DATABASE_PG_DB_USER,
                password: process.env.DATABASE_PG_DB_PASSWORD,
                database: process.env.DATABASE_PG_DB_NAME,
                ssl: process.env.DATABASE_PG_DB_SSL === 'true',
                entities: [kpi_entity_1.KPI, kpi_info_entity_1.KpiInfo],
                migrations: ['../migrations/*.ts'],
                synchronize: false,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.LOG_LEVEL) !== null && _b !== void 0 ? _b : 'trace',
                    formatters: {
                        level: (label) => ({ level: label }),
                    },
                    genReqId: () => (0, common_1.generateId)({ prefix: 'req' }),
                    quietReqLogger: true,
                    redact: ['req.headers.apikey', 'req.headers.authorization'],
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            colorize: ((_c = process.env) === null || _c === void 0 ? void 0 : _c.APP_ENV) === 'dev',
                            singleLine: ((_d = process.env) === null || _d === void 0 ? void 0 : _d.APP_ENV) !== 'dev',
                        },
                    },
                },
            }),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                fallbacks: {
                    'en-CA': 'fr',
                    'en-*': 'en',
                    'fr-*': 'fr',
                },
                loaderOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: false,
                },
                resolvers: [
                    nestjs_i18n_1.AcceptLanguageResolver,
                ],
            }),
            cron_module_1.CronModule,
            kpi_module_1.KpiModule,
            kpi_info_module_1.KpiInfoModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map