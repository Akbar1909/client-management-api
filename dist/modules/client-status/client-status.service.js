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
exports.ClientStatusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientStatusService = class ClientStatusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const list = await this.prisma.clientStatus.findMany();
        return {
            status: 'success',
            data: list,
        };
    }
    async createOne(dto) {
        const clientStatus = await this.prisma.clientStatus.create({ data: dto });
        return {
            status: 'success',
            data: clientStatus,
        };
    }
    async updateOne(dto, id) {
        return await this.prisma.clientStatus.update({
            where: { id },
            data: dto,
        });
    }
    async updateMany(records) {
        return await Promise.all(records
            .filter((record) => record.id)
            .map((record) => this.updateOne(record, record.id)));
    }
    async deleteOne(id) {
        await this.prisma.clientStatus.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
};
exports.ClientStatusService = ClientStatusService;
exports.ClientStatusService = ClientStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientStatusService);
//# sourceMappingURL=client-status.service.js.map