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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
        this.configService = new config_1.ConfigService();
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const validationExceptionObject = this.prepareValidationErrorObj(exception);
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            ...(this.isCustomException(exception) && {
                error: exception.response,
            }),
            ...(!isProduction && {
                stacktrace: exception?.stack,
                validation: validationExceptionObject,
            }),
            message: exception.response?.message,
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
    prepareValidationErrorObj(exception) {
        const output = [];
        const { message: messages = [] } = exception.response || { message: [] };
        for (const message of messages) {
            if (message instanceof class_validator_1.ValidationError) {
                output.push({
                    sentValue: message.value,
                    constraints: Object.values(message.constraints || {}),
                });
            }
        }
        return output;
    }
    isCustomException(exception) {
        return (exception instanceof common_1.ConflictException ||
            exception instanceof common_1.BadRequestException);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filter.js.map