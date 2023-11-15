"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const extract_object_part_1 = require("../../utils/extract-object-part");
let AuthService = class AuthService {
    constructor(prisma, config, jwt) {
        this.prisma = prisma;
        this.config = config;
        this.jwt = jwt;
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username },
            include: {
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not exist', common_1.HttpStatus.CONFLICT);
        }
        const passwordMatched = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatched) {
            throw new common_1.HttpException(`Password not matched`, common_1.HttpStatus.CONFLICT);
        }
        const { access_token, refresh_token } = await this.generateToken({
            id: user.id,
            username: user.username,
            role: user.role.name,
            orgId: user.orgId,
        });
        return {
            access_token,
            refresh_token,
        };
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                role: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException(`User with the ${userId} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        if (!refreshToken) {
            throw new common_1.HttpException('Refresh token is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const { access_token, refresh_token } = await this.generateToken({
            role: user.role.name,
            ...(0, extract_object_part_1.extractObjectPart)({
                keys: ['id', 'username', 'orgId'],
                obj: user,
                type: 'include',
            }),
        });
        await this.updateRefreshToken(userId, refreshToken);
        return {
            access_token,
            refresh_token,
        };
    }
    async updateRefreshToken(id, refreshToken) {
        await this.prisma.user.update({ where: { id }, data: { refreshToken } });
    }
    async checkUserAlreadyExists(username) {
        return await this.prisma.user.findUnique({ where: { username } });
    }
    async generateToken({ id, username, role, orgId, }) {
        const payload = {
            id,
            username,
            role,
            orgId,
        };
        const [access_token, refresh_token] = await Promise.all([
            this.jwt.signAsync(payload, {
                expiresIn: this.config.get('JWT_ACCESS_TIME'),
                secret: this.config.get('ACCESS_TOKEN_SECRET'),
            }),
            this.jwt.signAsync(payload, {
                expiresIn: this.config.get('JWT_REFRESH_TIME'),
                secret: this.config.get('REFRESH_TOKEN_SECRET'),
            }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map