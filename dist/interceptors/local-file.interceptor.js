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
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const multer_1 = require("multer");
const time_1 = require("../utils/time");
function LocalFilesInterceptor(options) {
    let Interceptor = class Interceptor {
        constructor(configService) {
            const fileDestination = configService.get('UPLOADED_FILES_DESTINATION');
            const destination = `${fileDestination}${options.path}`;
            const multerOptions = {
                storage: (0, multer_1.diskStorage)({
                    destination,
                    filename: (_, file, cb) => {
                        cb(null, file.originalname + '-' + (0, time_1.format)(new Date()));
                    },
                }),
            };
            this.fileInterceptor = new ((0, platform_express_1.FileInterceptor)(options.fieldName, multerOptions))();
        }
        intercept(...args) {
            return this.fileInterceptor.intercept(...args);
        }
    };
    Interceptor = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [config_1.ConfigService])
    ], Interceptor);
    return (0, common_1.mixin)(Interceptor);
}
exports.default = LocalFilesInterceptor;
//# sourceMappingURL=local-file.interceptor.js.map