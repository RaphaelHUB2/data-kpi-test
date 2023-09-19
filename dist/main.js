"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const exposePkgInfo = require("pkginfo");
const nestjs_apm_1 = require("@hub2/nestjs-apm");
const app_module_1 = require("./app.module");
exposePkgInfo(module, 'version');
(0, nestjs_apm_1.default)();
async function bootstrap() {
    const port = Number(process.env.APP_PORT) || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.enableShutdownHooks([common_1.ShutdownSignal.SIGTERM]);
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Hub2 Service · data-kpi')
        .setDescription('This service returns kpi to display on the website')
        .setContact('Hub2', 'https://www.hub2.io/', 'contact@hub2.io')
        .setVersion(module.exports.version)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, { deepScanRoutes: true });
    swagger_1.SwaggerModule.setup('/docs', app, document, { customSiteTitle: 'Hub2 · data-kpi' });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map