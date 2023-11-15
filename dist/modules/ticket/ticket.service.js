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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const generate_where_1 = require("../../utils/generate-where");
const extract_object_part_1 = require("../../utils/extract-object-part");
const serialize_1 = require("../../utils/serialize");
const client_1 = require("@prisma/client");
const time_1 = require("../../utils/time");
let TicketService = class TicketService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll({ page = 0, size = 10, search = '', status, regDateOrder, bugFixDateOrder, ...rest }, me) {
        const where = this.getWhere({ search, status, ...rest }, me);
        const [total, tickets] = await this.prisma.$transaction([
            this.prisma.ticket.count({ where }),
            this.prisma.ticket.findMany({
                skip: page * size,
                take: size,
                where,
                orderBy: [
                    {
                        regDate: regDateOrder,
                    },
                    {
                        bugFixDate: bugFixDateOrder,
                    },
                ],
                include: {
                    client: {
                        select: {
                            name: true,
                            contactName: true,
                            contactPhone: true,
                            pcCount: true,
                        },
                    },
                    type: true,
                    developer: true,
                    side: true,
                },
            }),
        ]);
        return {
            status: 'success',
            data: {
                prev: page > 1 ? page - 1 : null,
                next: page * size < total ? page + 1 : null,
                page,
                size,
                count: tickets.length,
                total,
                list: tickets.map((ticket) => ({
                    ...ticket,
                    createdByMe: ticket.operatorId === me.id,
                })),
            },
        };
    }
    async create({ attachments: attachmentIds, ...rest }, user) {
        const ticket = await this.prisma.ticket.create({
            data: {
                ...rest,
                prevStatus: rest.status,
                operatorId: user.id,
                attachments: {
                    connect: attachmentIds.map((attachmentId) => ({ id: attachmentId })),
                },
            },
        });
        return {
            status: 'success',
            data: ticket,
        };
    }
    async updateOne(id, { attachments: attachmentIds = [], ...rest }) {
        const ticket = await this.prisma.ticket.update({
            where: { id },
            data: {
                ...rest,
                attachments: {
                    set: attachmentIds.map((attachmentId) => ({ id: attachmentId })),
                },
            },
        });
        return {
            status: 'success',
            data: ticket,
        };
    }
    async deleteOne(id) {
        await this.prisma.ticket.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
    async findOne(id) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                client: { select: { id: true, name: true } },
                developer: { select: { id: true } },
                operator: { select: { id: true } },
                attachments: true,
            },
        });
        return {
            status: 'success',
            data: ticket,
        };
    }
    async getRequestTicketsCountByClient() {
        const data = await this.prisma.$queryRaw `
    SELECT
      "Client"."id",
      "Client"."name",
      CAST(COUNT(*) as INTEGER) as count
    FROM 
      "Ticket"
    INNER JOIN 
      "Client"
    ON 
      "Ticket"."clientId" = "Client"."id"
    WHERE 
      "Ticket"."status"='request'
    GROUP BY
      "Client"."id"
    `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(data),
        };
    }
    async getBugTicketsReportByInterval(query, user) {
        const data = await this.prisma.$queryRaw `
    SELECT 
      TO_CHAR("Ticket"."createdAt"::date,'dd.mm.yyyy') as day, 
      "TicketSide"."name",
      CAST(COUNT(*) as INTEGER) as count 
    FROM "Ticket" 
    INNER JOIN "TicketSide" ON "Ticket"."sideId"="TicketSide"."id"
    WHERE 
      EXTRACT('year' FROM "Ticket"."createdAt") = ${query.year || new Date().getFullYear()} AND EXTRACT('month' FROM "Ticket"."createdAt") = ${query.month || new Date().getMonth() + 1} 
      ${user.role === 'client'
            ? client_1.Prisma.sql `AND "Ticket"."clientId" = ${user.orgId}`
            : client_1.Prisma.empty}
    GROUP BY 
      day,
      "TicketSide"."name"
    ORDER BY 
      day`;
        return {
            status: 'success',
            data,
        };
    }
    async getOpenTicketsCount() {
        const data = await this.prisma.ticket.aggregate({
            where: { status: 'bug_report' },
            _count: true,
        });
        return {
            status: 'success',
            data: data._count,
        };
    }
    async getBugTicketsCount(user) {
        const requestCount = await this.prisma.ticket.groupBy({
            by: 'status',
            where: {
                status: {
                    equals: 'request',
                },
                ...(user.role === 'client' && { clientId: user.orgId }),
            },
            _count: true,
        });
        const bugCount = await this.prisma.ticket.groupBy({
            by: 'status',
            where: {
                status: {
                    equals: 'bug_report',
                },
                ...(user.role === 'client' && { clientId: user.orgId }),
            },
            _count: true,
        });
        return {
            status: 'success',
            data: {
                request: requestCount?.[0]?._count || 0,
                bug: bugCount?.[0]?._count || 0,
            },
        };
    }
    async getBackSideTicketsCount() {
        return {
            status: 'success',
            data: 0,
        };
    }
    async getClientSideTicketsCount() {
        const data = 0;
        return {
            status: 'success',
            data: data,
        };
    }
    async findManyAttachments(ids) {
        return await this.prisma.upload.findMany({ where: { id: { in: ids } } });
    }
    async findManyAttachmentsByTicketId(id) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            select: { attachments: true },
        });
        return ticket?.attachments || [];
    }
    async getStatsBySide(params, me) {
        const groupedSide = await this.prisma.ticket.groupBy({
            where: this.getWhere(params, me),
            by: 'sideId',
            _count: true,
        });
        const keyValue = groupedSide.reduce((acc, cur) => ({
            ...acc,
            ...(cur.sideId && { [cur.sideId]: cur._count }),
        }), {});
        const sides = await this.prisma.ticketSide.findMany({
            where: {
                id: {
                    in: Object.keys(keyValue).map(Number),
                },
            },
        });
        const output = [];
        sides.forEach((side) => {
            if (keyValue[side.id]) {
                output.push({
                    label: side.name,
                    value: side.id,
                    count: keyValue[side.id],
                });
            }
        });
        return {
            status: 'success',
            data: output,
        };
    }
    async getStatsByType(clientId) {
        const result = await this.prisma.ticket.groupBy({
            where: { clientId },
            by: 'status',
            _count: true,
        });
        return {
            status: 'success',
            data: result,
        };
    }
    async getStatsByModule(params, me) {
        const result = await this.prisma.ticket.groupBy({
            where: this.getWhere(params, me),
            by: 'typeId',
            _count: true,
        });
        const objResult = result.reduce((acc, cur) => ({
            ...acc,
            ...(cur.typeId && { [cur.typeId]: cur._count }),
        }), {});
        const modules = await this.prisma.ticketType.findMany({
            where: {
                id: {
                    in: Object.keys(objResult).map(Number),
                },
            },
        });
        const output = [];
        modules.forEach((ticketModule) => {
            if (objResult[ticketModule.id]) {
                output.push({
                    label: ticketModule.name,
                    value: ticketModule.id,
                    count: objResult[ticketModule.id],
                });
            }
        });
        return {
            status: 'success',
            data: output,
        };
    }
    async getStatsByStatus(params, me) {
        const result = await this.prisma.ticket.groupBy({
            where: this.getWhere(params, me),
            by: 'status',
            _count: true,
        });
        return {
            status: 'success',
            data: result,
        };
    }
    async getStatsByClient(params, me) {
        const result = await this.prisma.ticket.groupBy({
            where: this.getWhere(params, me),
            by: 'clientId',
            _count: true,
        });
        const objResult = result.reduce((acc, cur) => ({ ...acc, [cur.clientId]: cur._count }), {});
        const clients = await this.prisma.client.findMany({
            where: {
                id: {
                    in: Object.keys(objResult).map(Number),
                },
            },
        });
        const output = [];
        clients.forEach((client) => {
            if (objResult[client.id]) {
                output.push({
                    value: client.id,
                    label: `${client.name}`,
                    count: objResult[client.id],
                });
            }
        });
        return {
            status: 'success',
            data: output,
        };
    }
    async getStatsByDev(params, me) {
        const result = await this.prisma.ticket.groupBy({
            where: this.getWhere(params, me),
            by: ['developerId'],
            _count: true,
        });
        const objResult = result.reduce((acc, cur) => ({
            ...acc,
            ...(cur.developerId && { [cur.developerId]: cur._count }),
        }), {});
        const devs = await this.prisma.user.findMany({
            where: { id: { in: Object.keys(objResult).map(Number) } },
        });
        const output = [];
        devs.forEach((dev) => {
            if (objResult[dev.id]) {
                output.push({
                    value: dev.id,
                    label: `${dev.firstName} ${dev.lastName}`,
                    count: objResult[dev.id],
                });
            }
        });
        return {
            status: 'success',
            data: output,
        };
    }
    async getBugTicketCountBySide(me) {
        const data = await this.prisma.$queryRaw `
    SELECT
      "TicketSide"."name",
      "TicketSide"."id",
      CAST(COUNT(*) AS INTEGER) as count
    FROM
      "Ticket"
    INNER JOIN 
      "TicketSide"
    ON "Ticket"."sideId" = "TicketSide"."id"
    ${me.role === 'client'
            ? client_1.Prisma.sql `WHERE "Ticket"."clientId"=${me.orgId}`
            : client_1.Prisma.empty}
    GROUP BY
      "TicketSide"."id",
      "TicketSide"."name"
    `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(data),
        };
    }
    async getBugTicketCountByModule(user) {
        const counts = await this.prisma.$queryRaw `
    SELECT 
      "TicketType"."name", 
      "TicketType"."id",
      CAST(COUNT("Ticket"."name") as INTEGER) as "count" 
    FROM "Ticket" 
    INNER JOIN 
      "TicketType" ON "Ticket"."typeId" = "TicketType"."id" 
    ${user.role === 'client'
            ? client_1.Prisma.sql `
      WHERE "clientId" = ${user.orgId}
    `
            : client_1.Prisma.empty}
    GROUP BY 
      "TicketType"."name",
      "TicketType"."id"

    `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(counts),
        };
    }
    async getBugTicketCountByClient() {
        const counts = await this.prisma.$queryRaw `
    SELECT 
      "Client"."name", 
      "Client"."id" as client_id,
      CAST(COUNT("Ticket"."id") as INTEGER) as "count" 
    FROM 
      "Ticket" 
    INNER JOIN 
      "Client" ON "Ticket"."clientId" = "Client"."id" 
    WHERE
      "Ticket"."status"='bug_report'
    GROUP BY 
      "Client"."name",
      "Client"."id"
    `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(counts).map((item) => ({
                ...(0, extract_object_part_1.extractObjectPart)({
                    keys: ['client_id'],
                    obj: item,
                    type: 'exclude',
                }),
                clientId: item.client_id,
            })),
        };
    }
    async getBugTicketCountByDev() {
        const counts = await this.prisma.$queryRaw `
    SELECT 
      "User"."firstName", 
      "User"."lastName",
      "User"."id",
      CAST(COUNT("Ticket"."id") as INTEGER) as count 
    FROM "Ticket" 
      INNER JOIN 
      "User" ON "Ticket"."developerId" = "User"."id" 
    GROUP BY "User"."id"
    `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(counts),
        };
    }
    async getBugTicketCountByOperator(user) {
        const counts = await this.prisma.$queryRaw `
    SELECT 
      "User"."firstName",
      "User"."lastName",
      "User"."id", 
      CAST(COUNT("Ticket"."id") as INTEGER) as count 
    FROM "Ticket" 
    INNER JOIN 
      "User" ON "Ticket"."operatorId" = "User"."id" 
    WHERE
      "Ticket"."status" = 'bug_report'
    ${user.role === 'client'
            ? client_1.Prisma.sql `
      AND "clientId" = ${user.orgId}
    `
            : client_1.Prisma.empty}
    GROUP BY 
      "User"."id"
     `;
        return {
            status: 'success',
            data: (0, serialize_1.customSerialize)(counts),
        };
    }
    getWhere({ status, clientId, search = '', pcCountGte, pcCountLte, developerId, sideId, typeId, regDateGte, regDateLte, bugFixDateGte, bugFixDateLte, ...rest }, me) {
        const where = (0, generate_where_1.generateWhere)((0, extract_object_part_1.extractObjectPart)({
            keys: ['regDateOrder', 'bugFixDateOrder'],
            type: 'exclude',
            obj: rest,
        }));
        return {
            ...where,
            ...(me.role === 'client' && { clientId: me.orgId }),
            ...(clientId && { clientId: { in: clientId } }),
            ...(developerId && { developerId: { in: developerId } }),
            ...(status && { status: { in: status } }),
            ...(sideId && { sideId: { in: sideId } }),
            ...(typeId && { typeId: { in: typeId } }),
            regDate: {
                ...(regDateGte && { gte: (0, time_1.subtract5Hours)(new Date(regDateGte)) }),
                ...(regDateLte && { lte: (0, time_1.subtract5Hours)(new Date(regDateLte)) }),
            },
            bugFixDate: {
                ...(bugFixDateGte && { gte: (0, time_1.subtract5Hours)(new Date(bugFixDateGte)) }),
                ...(bugFixDateLte && { lte: (0, time_1.subtract5Hours)(new Date(bugFixDateLte)) }),
            },
            client: {
                pcCount: {
                    ...(typeof pcCountGte === 'number' && { gte: pcCountGte }),
                    ...(typeof pcCountLte === 'number' && { lte: pcCountLte }),
                },
            },
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ],
        };
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketService);
//# sourceMappingURL=ticket.service.js.map