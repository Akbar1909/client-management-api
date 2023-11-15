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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const prisma_service_1 = require("../prisma/prisma.service");
('@nestjs/platform-express');
let UploadService = class UploadService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upload(file) {
        const dbEntity = await this.prisma.upload.create({
            data: {
                filename: file.filename,
                filePath: this.buildFilepath(file.filename),
                originalName: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
            },
        });
        const response = {
            message: 'File uploaded successfully!',
            data: dbEntity,
        };
        return response;
    }
    async findOne(id) {
        const dbEntity = await this.prisma.upload.findUnique({ where: { id } });
        if (!dbEntity) {
            throw new common_1.NotFoundException(`File with id: ${id} not found`);
        }
        const file = await fs.promises.readFile(this.buildFilepath(dbEntity.filename));
        return file;
    }
    buildFilepath(filename) {
        return (0, path_1.join)(__dirname, '..', '..', '..', '..', '/uploads', filename);
    }
    async deleteOne(id) {
        const file = await this.prisma.upload.findUnique({ where: { id } });
        if (!file) {
            throw new common_1.NotFoundException(`File with the id ${id} not found`);
        }
        if (fs.existsSync(file.filePath)) {
            fs.unlinkSync(file.filePath);
        }
        await this.prisma.upload.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UploadService);
//# sourceMappingURL=upload.service.js.map