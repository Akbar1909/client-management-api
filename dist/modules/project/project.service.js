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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ticket_side_service_1 = require("../ticket-side/ticket-side.service");
const ticket_type_service_1 = require("../ticket-type/ticket-type.service");
const client_status_service_1 = require("../client-status/client-status.service");
let ProjectService = class ProjectService {
    constructor(prisma, ticketTypeService, ticketSideService, clientStatusService) {
        this.prisma = prisma;
        this.ticketTypeService = ticketTypeService;
        this.ticketSideService = ticketSideService;
        this.clientStatusService = clientStatusService;
    }
    async create({ sides, clientStatuses, modules, ...rest }) {
        const record = await this.prisma.project.create({
            data: {
                ...rest,
                sides: { create: sides },
                clientStatuses: {
                    create: clientStatuses,
                },
                modules: { create: modules },
            },
        });
        return {
            status: 'success',
            data: record,
        };
    }
    async findAll() {
        const records = await this.prisma.project.findMany({
            include: { sides: true, clientStatuses: true, modules: true },
        });
        return {
            status: 'success',
            data: records,
        };
    }
    async findOne(id) {
        const record = await this.prisma.project.findFirst({
            where: { projectId: id },
            include: {
                sides: true,
                clientStatuses: true,
                modules: true,
            },
        });
        return {
            status: 'success',
            data: record,
        };
    }
    async update(id, { sides = [], modules = [], clientStatuses = [], ...rest }) {
        const record = await this.prisma.project.update({
            where: { projectId: id },
            data: {
                ...rest,
                sides: {
                    create: sides?.filter((side) => !side.id),
                    connect: (await this.ticketSideService.updateMany(sides))?.map((side) => ({ id: side.id })),
                },
                modules: {
                    create: modules?.filter((side) => !side.id),
                    connect: (await this.ticketTypeService.updateMany(modules))?.map((side) => ({ id: side.id })),
                },
                clientStatuses: {
                    create: clientStatuses?.filter((clientStatus) => !clientStatus.id),
                    connect: (await this.clientStatusService.updateMany(clientStatuses))?.map((clientStatus) => ({ id: clientStatus.id })),
                },
            },
        });
        return {
            status: 'success',
            data: record,
        };
    }
    async remove(id) {
        await this.prisma.project.delete({ where: { projectId: id } });
        return {
            status: 'success',
            data: null,
        };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ticket_type_service_1.TicketTypeService,
        ticket_side_service_1.TicketSideService,
        client_status_service_1.ClientStatusService])
], ProjectService);
//# sourceMappingURL=project.service.js.map