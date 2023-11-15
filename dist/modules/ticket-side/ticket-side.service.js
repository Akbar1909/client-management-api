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
exports.TicketSideService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketSideService = class TicketSideService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const data = await this.prisma.ticketSide.findMany({
            orderBy: { updatedAt: 'desc' },
        });
        return {
            status: 'success',
            data,
        };
    }
    async createOne(dto) {
        const newEntity = await this.prisma.ticketSide.create({ data: dto });
        return {
            status: 'success',
            data: newEntity,
        };
    }
    async updateOne(dto, id) {
        const updatedItem = await this.prisma.ticketSide.update({
            where: { id },
            data: dto,
        });
        return updatedItem;
    }
    async updateMany(records) {
        return await Promise.all(records
            .filter((record) => record.id)
            .map((record) => this.updateOne(record, record.id)));
    }
    async deleteOne(id) {
        await this.prisma.ticketSide.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
};
exports.TicketSideService = TicketSideService;
exports.TicketSideService = TicketSideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketSideService);
//# sourceMappingURL=ticket-side.service.js.map