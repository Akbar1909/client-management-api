"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const all_exception_filter_1 = require("./global-filters/all-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new all_exception_filter_1.AllExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidUnknownValues: false,
        exceptionFactory: (errors) => new common_1.BadRequestException(errors),
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Client management')
        .setDescription(`### The client-management API description`)
        .setVersion('1.0')
        .addTag('client-management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const PRO_URL = 'http://91.190.159.71:9001';
    const LOCAL_URL = 'http://localhost:3001';
    app.enableCors({
        origin: LOCAL_URL,
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map