"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocumentation = void 0;
const swagger_1 = require("@nestjs/swagger");
function generateOpenApiDocumentation(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Test API')
        .setDescription('Description')
        .setVersion('1.0')
        .addTag('Your Tag')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    return document;
}
exports.generateOpenApiDocumentation = generateOpenApiDocumentation;
//# sourceMappingURL=swagger.js.map