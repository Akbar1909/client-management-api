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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const extract_object_part_1 = require("../../utils/extract-object-part");
const client_1 = require("@prisma/client");
const serialize_1 = require("../../utils/serialize");
const order_1 = __importDefault(require("../../dto/order"));
const makeItMap_1 = require("../../utils/makeItMap");
let ClientService = class ClientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll({ select, contractDueToLte, contractDueToGte, search, totalTickets, pcCount, statusId, page = 1, size = 10, }, me) {
        const query = `%${search}%`;
        const total = await this.prisma.client.count();
        const clients = await this.prisma.$queryRaw `
    SELECT
      "Client".*,
      "ClientStatus"."name" as "status",
      COUNT("Ticket"."id") as "totalTickets"
    FROM
      "Client"
    LEFT JOIN
      "ClientStatus"  
    ON
      "Client"."statusId"="ClientStatus"."id"
    LEFT JOIN
      "Ticket"
    ON
      "Ticket"."clientId"="Client"."id"
    ${select === 0
            ? client_1.Prisma.sql `WHERE ("Client"."name" ILIKE ${query} OR "Client"."contactName" ILIKE ${query}) 
        
        ${client_1.Prisma.sql ` 
        
        ${contractDueToGte
                ? client_1.Prisma.sql `AND DATE("Client"."contractDueTo") >= ${contractDueToGte}::date`
                : client_1.Prisma.empty} 
        ${contractDueToLte
                ? client_1.Prisma.sql `AND DATE("Client"."contractDueTo") <= ${contractDueToLte}::date`
                : client_1.Prisma.empty}

             ${statusId
                ? client_1.Prisma.sql `AND "Client"."statusId" IN (${client_1.Prisma.join(statusId)})`
                : client_1.Prisma.empty}
          `}`
            : client_1.Prisma.empty}
    GROUP BY
      "Client"."id",
      "ClientStatus"."name"
    ${client_1.Prisma.sql `
    ORDER BY 
      ${!totalTickets && !pcCount
            ? client_1.Prisma.sql `LOWER("Client"."name")`
            : client_1.Prisma.empty}

      ${totalTickets
            ? totalTickets === order_1.default.ASC
                ? client_1.Prisma.sql `"totalTickets" ASC`
                : client_1.Prisma.sql `"totalTickets" DESC`
            : client_1.Prisma.empty}
      

    ${pcCount
            ? pcCount === order_1.default.ASC
                ? client_1.Prisma.sql `"Client"."pcCount" ASC`
                : client_1.Prisma.sql `"Client"."pcCount" DESC`
            : client_1.Prisma.empty}    
    `}
    OFFSET
      ${(page - 1) * size}
    LIMIT
      ${size}
    `;
        const serializedClients = (0, serialize_1.customSerialize)(clients);
        const preparedClients = select == 0
            ? serializedClients.map((client) => this.prepareSingleClient(client, me.id))
            : serializedClients.map((client) => ({
                id: client.id,
                name: client.name,
            }));
        return {
            status: 'success',
            data: {
                list: preparedClients,
                total,
            },
        };
    }
    async findOne(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                tickets: { include: { developer: true, operator: true, type: true } },
            },
        });
        return {
            status: 'success',
            data: client,
        };
    }
    async create(dto, me) {
        const client = await this.prisma.client.create({
            data: {
                createdById: me.id,
                ...dto,
            },
            include: { status: true },
        });
        return {
            status: 'success',
            data: this.prepareSingleClient({ ...client, status: client.status.name }, me.id),
        };
    }
    async updateStatus(dto) {
        const updatedClient = await this.prisma.client.update({
            where: { id: dto.id },
            include: {
                status: true,
            },
            data: {
                statusId: dto.statusId,
            },
        });
        return {
            status: 'success',
            data: updatedClient,
        };
    }
    async update(id, dto) {
        const updatedClient = await this.prisma.client.update({
            where: {
                id: id,
            },
            data: dto,
        });
        return {
            status: 'success',
            data: updatedClient,
        };
    }
    async delete(id) {
        await this.prisma.client.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
    async getTickets(id) {
        const tickets = await this.prisma.ticket.findMany({
            where: { clientId: id },
        });
        return {
            status: 'success',
            data: tickets,
        };
    }
    async getClientsCountByContractDate() {
        const activeCounts = await this.prisma.client.aggregate({
            where: {
                contractDueTo: {
                    gte: new Date(),
                },
            },
            _count: true,
        });
        const deActiveCounts = await this.prisma.client.aggregate({
            where: {
                contractDueTo: {
                    lte: new Date(),
                },
            },
            _count: true,
        });
        return {
            status: 'success',
            data: {
                active: activeCounts._count,
                deActive: deActiveCounts._count,
            },
        };
    }
    async getTotalPcAndClientCount() {
        const counts = await this.prisma.client.aggregate({
            _sum: { pcCount: true },
            _count: true,
        });
        return {
            status: 'success',
            data: {
                pcCount: counts._sum.pcCount,
                clientCount: counts._count,
            },
        };
    }
    async getActivePcAndClientCount() {
        const counts = await this.prisma.client.aggregate({
            where: { statusId: 1 },
            _sum: { pcCount: true },
            _count: true,
        });
        return {
            status: 'success',
            data: {
                pcCount: counts._sum.pcCount,
                clientCount: counts._count,
            },
        };
    }
    async getStatsByStatusId(query) {
        const groupedData = await this.prisma.client.groupBy({
            where: this.getWhere(query),
            by: ['statusId'],
            _count: true,
        });
        const keyValue = (0, makeItMap_1.makeItMap)(groupedData, 'statusId');
        const statusList = await this.prisma.clientStatus.findMany({
            where: {
                id: {
                    in: query.statusId,
                },
            },
        });
        const result = [];
        statusList.forEach((item) => {
            if (keyValue.has(item.id)) {
                result.push({
                    value: item.id,
                    count: keyValue.get(item.id)._count,
                    label: item.name,
                });
            }
        });
        return {
            status: 'success',
            data: result,
        };
    }
    prepareSingleClient(client, meId) {
        return {
            createdByMe: client.createdById === meId,
            status: client.status,
            ...(0, extract_object_part_1.extractObjectPart)({
                obj: client,
                type: 'exclude',
                keys: ['createdAt', 'updatedAt', 'status', 'statusId'],
            }),
        };
    }
    getWhere({ search, statusId }) {
        return {
            ...(statusId && { statusId: { in: statusId } }),
            OR: [
                {
                    name: {
                        contains: search || '',
                        mode: 'insensitive',
                    },
                },
            ],
        };
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
//# sourceMappingURL=client.service.js.map