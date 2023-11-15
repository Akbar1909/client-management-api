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
exports.RTGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let RTGuard = class RTGuard {
    constructor(jwt, config) {
        this.jwt = jwt;
        this.config = config;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request) {
        if (!request.headers.refresh_token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const token = request.headers.refresh_token;
            if (!token) {
                throw new common_1.UnauthorizedException();
            }
            const decoded = await this.jwt.verifyAsync(token, {
                secret: this.config.get('REFRESH_TOKEN_SECRET'),
            });
            request.user = decoded;
            return true;
        }
        catch (e) {
            if (e.message === 'jwt expired') {
                throw new common_1.UnauthorizedException('Token expired');
            }
            return false;
        }
    }
};
exports.RTGuard = RTGuard;
exports.RTGuard = RTGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], RTGuard);
//# sourceMappingURL=rt.guard.js.map