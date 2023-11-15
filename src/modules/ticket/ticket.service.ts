import { Injectable } from '@nestjs/common';
import { TicketCreateDto, TicketUpdateDto } from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { TicketFilterDto } from './dto/ticket-filter.dto';
import { generateWhere } from 'src/utils/generate-where';
import { TicketEntity } from './ticket.entity';
import { UserEntity } from '../user/user.entity';
import { AuthEntity } from '../auth/auth.entity';
import { extractObjectPart } from 'src/utils/extract-object-part';
import { customSerialize } from 'src/utils/serialize';
import { TicketDateReportDto } from './dto/ticket-date-report.dto';
import { Prisma } from '@prisma/client';
import { subtract5Hours } from 'src/utils/time';

type CountType<T = string> = {
  name: string;
  count: T;
};

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    {
      page = 0,
      size = 10,
      search = '',
      status,
      regDateOrder,
      bugFixDateOrder,
      ...rest
    }: TicketFilterDto,
    me: AuthEntity,
  ) {
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

  async create(
    { attachments: attachmentIds, ...rest }: TicketCreateDto,
    user: UserEntity,
  ) {
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

  async updateOne(
    id: number,
    { attachments: attachmentIds = [], ...rest }: TicketUpdateDto,
  ) {
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

  async deleteOne(id: number) {
    await this.prisma.ticket.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }

  async findOne(id: number) {
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
    const data = await this.prisma.$queryRaw`
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
      data: customSerialize(data),
    };
  }

  async getBugTicketsReportByInterval(
    query: TicketDateReportDto,
    user: AuthEntity,
  ) {
    const data = await this.prisma.$queryRaw`
    SELECT 
      TO_CHAR("Ticket"."createdAt"::date,'dd.mm.yyyy') as day, 
      "TicketSide"."name",
      CAST(COUNT(*) as INTEGER) as count 
    FROM "Ticket" 
    INNER JOIN "TicketSide" ON "Ticket"."sideId"="TicketSide"."id"
    WHERE 
      EXTRACT('year' FROM "Ticket"."createdAt") = ${
        query.year || new Date().getFullYear()
      } AND EXTRACT('month' FROM "Ticket"."createdAt") = ${
        query.month || new Date().getMonth() + 1
      } 
      ${
        user.role === 'client'
          ? Prisma.sql`AND "Ticket"."clientId" = ${user.orgId}`
          : Prisma.empty
      }
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

  async getBugTicketsCount(user: AuthEntity) {
    const requestCount = await this.prisma.ticket.groupBy({
      by: 'status',
      where: {
        status: {
          equals: 'request',
        },
        ...(user.role === 'client' && { clientId: user.orgId as number }),
      },
      _count: true,
    });

    const bugCount = await this.prisma.ticket.groupBy({
      by: 'status',
      where: {
        status: {
          equals: 'bug_report',
        },
        ...(user.role === 'client' && { clientId: user.orgId as number }),
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
    // TODO write raw sql query

    return {
      status: 'success',
      data: 0,
    };
  }

  async getClientSideTicketsCount() {
    // TODO write raw sql query
    const data = 0;

    return {
      status: 'success',
      data: data,
    };
  }

  async findManyAttachments(ids: number[]) {
    return await this.prisma.upload.findMany({ where: { id: { in: ids } } });
  }

  async findManyAttachmentsByTicketId(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      select: { attachments: true },
    });
    return ticket?.attachments || [];
  }

  async getStatsBySide(params: TicketFilterDto, me: AuthEntity) {
    const groupedSide = await this.prisma.ticket.groupBy({
      where: this.getWhere(params, me),
      by: 'sideId',
      _count: true,
    });

    const keyValue: Record<string, number> = groupedSide.reduce(
      (acc, cur) => ({
        ...acc,
        ...(cur.sideId && { [cur.sideId]: cur._count }),
      }),
      {},
    );

    const sides = await this.prisma.ticketSide.findMany({
      where: {
        id: {
          in: Object.keys(keyValue).map(Number),
        },
      },
    });

    const output: Array<{ label: string; value: number; count: number }> = [];

    sides.forEach((side) => {
      if (keyValue[side.id]) {
        output.push({
          label: side.name,
          value: side.id,
          count: keyValue[side.id] as number,
        });
      }
    });

    return {
      status: 'success',
      data: output,
    };
  }

  async getStatsByType(clientId: number) {
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

  async getStatsByModule(params: TicketFilterDto, me: AuthEntity) {
    const result = await this.prisma.ticket.groupBy({
      where: this.getWhere(params, me),
      by: 'typeId',
      _count: true,
    });

    const objResult = result.reduce(
      (acc, cur) => ({
        ...acc,
        ...(cur.typeId && { [cur.typeId]: cur._count }),
      }),
      {} as Record<string, number>,
    );

    const modules = await this.prisma.ticketType.findMany({
      where: {
        id: {
          in: Object.keys(objResult).map(Number),
        },
      },
    });

    const output: Array<{ value: number; label: string; count: number }> = [];

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

  async getStatsByStatus(
    params: Omit<TicketFilterDto, 'page' | 'size'>,
    me: AuthEntity,
  ) {
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

  async getStatsByClient(params: TicketFilterDto, me: AuthEntity) {
    const result = await this.prisma.ticket.groupBy({
      where: this.getWhere(params, me),
      by: 'clientId',
      _count: true,
    });

    const objResult = result.reduce(
      (acc, cur) => ({ ...acc, [cur.clientId]: cur._count }),
      {} as Record<string, number>,
    );

    const clients = await this.prisma.client.findMany({
      where: {
        id: {
          in: Object.keys(objResult).map(Number),
        },
      },
    });

    const output: Array<{ value: number; label: string; count: number }> = [];

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

  async getStatsByDev(params: TicketFilterDto, me: AuthEntity) {
    const result = await this.prisma.ticket.groupBy({
      where: this.getWhere(params, me),
      by: ['developerId'],
      _count: true,
    });

    const objResult = result.reduce(
      (acc, cur) => ({
        ...acc,
        ...(cur.developerId && { [cur.developerId]: cur._count }),
      }),
      {} as Record<string, number>,
    );

    const devs = await this.prisma.user.findMany({
      where: { id: { in: Object.keys(objResult).map(Number) } },
    });

    const output: Array<{ value: number; label: string; count: number }> = [];

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

  async getBugTicketCountBySide(me: AuthEntity) {
    const data = await this.prisma.$queryRaw`
    SELECT
      "TicketSide"."name",
      "TicketSide"."id",
      CAST(COUNT(*) AS INTEGER) as count
    FROM
      "Ticket"
    INNER JOIN 
      "TicketSide"
    ON "Ticket"."sideId" = "TicketSide"."id"
    ${
      me.role === 'client'
        ? Prisma.sql`WHERE "Ticket"."clientId"=${me.orgId}`
        : Prisma.empty
    }
    GROUP BY
      "TicketSide"."id",
      "TicketSide"."name"
    `;

    return {
      status: 'success',
      data: customSerialize(data),
    };
  }

  async getBugTicketCountByModule(user: AuthEntity) {
    const counts = await this.prisma.$queryRaw<Array<CountType>>`
    SELECT 
      "TicketType"."name", 
      "TicketType"."id",
      CAST(COUNT("Ticket"."name") as INTEGER) as "count" 
    FROM "Ticket" 
    INNER JOIN 
      "TicketType" ON "Ticket"."typeId" = "TicketType"."id" 
    ${
      user.role === 'client'
        ? Prisma.sql`
      WHERE "clientId" = ${user.orgId}
    `
        : Prisma.empty
    }
    GROUP BY 
      "TicketType"."name",
      "TicketType"."id"

    `;

    return {
      status: 'success',
      data: customSerialize<Array<CountType>>(counts),
    };
  }

  async getBugTicketCountByClient() {
    const counts = await this.prisma.$queryRaw<
      Array<CountType & { client_id: number }>
    >`
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
      data: customSerialize<Array<CountType & { client_id: number }>>(
        counts,
      ).map((item) => ({
        ...extractObjectPart({
          keys: ['client_id'],
          obj: item,
          type: 'exclude',
        }),
        clientId: item.client_id,
      })),
    };
  }

  async getBugTicketCountByDev() {
    const counts = await this.prisma.$queryRaw<Array<CountType>>`
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
      data: customSerialize<Array<CountType>>(counts),
    };
  }

  async getBugTicketCountByOperator(user: AuthEntity) {
    const counts = await this.prisma.$queryRaw<Array<CountType>>`
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
    ${
      user.role === 'client'
        ? Prisma.sql`
      AND "clientId" = ${user.orgId}
    `
        : Prisma.empty
    }
    GROUP BY 
      "User"."id"
     `;

    return {
      status: 'success',
      data: customSerialize<Array<CountType>>(counts),
    };
  }

  getWhere(
    {
      status,
      clientId,
      search = '',
      pcCountGte,
      pcCountLte,
      developerId,
      sideId,
      typeId,
      regDateGte,
      regDateLte,
      bugFixDateGte,
      bugFixDateLte,
      ...rest
    }: Omit<TicketFilterDto, 'page' | 'size'>,
    me: AuthEntity,
  ): any {
    const where = generateWhere<Partial<TicketEntity>>(
      extractObjectPart({
        keys: ['regDateOrder', 'bugFixDateOrder'],
        type: 'exclude',
        obj: rest,
      }),
    );

    return {
      ...where,
      ...(me.role === 'client' && { clientId: me.orgId }),
      ...(clientId && { clientId: { in: clientId } }),
      ...(developerId && { developerId: { in: developerId } }),
      ...(status && { status: { in: status } }),
      ...(sideId && { sideId: { in: sideId } }),
      ...(typeId && { typeId: { in: typeId } }),
      regDate: {
        ...(regDateGte && { gte: subtract5Hours(new Date(regDateGte)) }),
        ...(regDateLte && { lte: subtract5Hours(new Date(regDateLte)) }),
      },
      bugFixDate: {
        ...(bugFixDateGte && { gte: subtract5Hours(new Date(bugFixDateGte)) }),
        ...(bugFixDateLte && { lte: subtract5Hours(new Date(bugFixDateLte)) }),
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
}
