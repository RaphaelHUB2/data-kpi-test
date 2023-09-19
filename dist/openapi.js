"use strict";


Object.defineProperty(exports, "__esModule", { value: true });

const fs = require("fs");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./docs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { preview: true });
    const documentation = (0, swagger_1.generateOpenApiDocumentation)(app);
    fs.writeFileSync('openapi.json', JSON.stringify(documentation));
    app.close();
}
bootstrap();
//# sourceMappingURL=openapi.js.map
