import { Injectable } from '@nestjs/common';
import { ClientCreateDto } from './dto/client-create.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ClientAllFilterDto, ClientUpdateDto, UpdateStatusDto } from './dto';
import { ClientEntity } from './client.entity';
import { extractObjectPart } from 'src/utils/extract-object-part';
import { UserEntity } from '../user/user.entity';
import { Prisma } from '@prisma/client';
import { customSerialize } from 'src/utils/serialize';
import OrderEnum from 'src/dto/order';
import { makeItMap } from 'src/utils/makeItMap';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    {
      select,
      contractDueToLte,
      contractDueToGte,
      search,
      totalTickets,
      pcCount,
      statusId,
      page = 1,
      size = 10,
    }: ClientAllFilterDto,
    me: UserEntity,
  ) {
    const query = `%${search}%`;
    const total = await this.prisma.client.count();
    const clients = await this.prisma.$queryRaw`
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
    ${
      select === 0
        ? Prisma.sql`WHERE ("Client"."name" ILIKE ${query} OR "Client"."contactName" ILIKE ${query}) 
        
        ${Prisma.sql` 
        
        ${
          contractDueToGte
            ? Prisma.sql`AND DATE("Client"."contractDueTo") >= ${contractDueToGte}::date`
            : Prisma.empty
        } 
        ${
          contractDueToLte
            ? Prisma.sql`AND DATE("Client"."contractDueTo") <= ${contractDueToLte}::date`
            : Prisma.empty
        }

             ${
               statusId
                 ? Prisma.sql`AND "Client"."statusId" IN (${Prisma.join(
                     statusId,
                   )})`
                 : Prisma.empty
             }
          `}`
        : Prisma.empty
    }
    GROUP BY
      "Client"."id",
      "ClientStatus"."name"
    ${Prisma.sql`
    ORDER BY 
      ${
        !totalTickets && !pcCount
          ? Prisma.sql`LOWER("Client"."name")`
          : Prisma.empty
      }

      ${
        totalTickets
          ? totalTickets === OrderEnum.ASC
            ? Prisma.sql`"totalTickets" ASC`
            : Prisma.sql`"totalTickets" DESC`
          : Prisma.empty
      }
      

    ${
      pcCount
        ? pcCount === OrderEnum.ASC
          ? Prisma.sql`"Client"."pcCount" ASC`
          : Prisma.sql`"Client"."pcCount" DESC`
        : Prisma.empty
    }    
    `}
    OFFSET
      ${(page - 1) * size}
    LIMIT
      ${size}
    `;

    const serializedClients: ClientEntity[] = customSerialize(clients);

    const preparedClients =
      select == 0
        ? serializedClients.map((client) =>
            this.prepareSingleClient(client as any, me.id),
          )
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

  async findOne(id: number) {
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

  async create(dto: ClientCreateDto, me: UserEntity) {
    const client = await this.prisma.client.create({
      data: {
        createdById: me.id,
        ...dto,
      },
      include: { status: true },
    });

    return {
      status: 'success',
      data: this.prepareSingleClient(
        { ...client, status: client.status.name },
        me.id,
      ),
    };
  }

  async updateStatus(dto: UpdateStatusDto) {
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

  async update(id: number, dto: ClientUpdateDto) {
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

  async delete(id: number) {
    await this.prisma.client.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }

  async getTickets(id: number) {
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

  async getStatsByStatusId(query: ClientAllFilterDto) {
    const groupedData = await this.prisma.client.groupBy({
      where: this.getWhere(query),
      by: ['statusId'],
      _count: true,
    });

    const keyValue = makeItMap(groupedData, 'statusId');

    const statusList = await this.prisma.clientStatus.findMany({
      where: {
        id: {
          in: query.statusId,
        },
      },
    });

    const result: Array<{ value: number; count: number; label: string }> = [];

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

  prepareSingleClient(client: ClientEntity, meId: number) {
    return {
      createdByMe: client.createdById === meId,
      status: client.status,
      ...extractObjectPart<ClientEntity>({
        obj: client,
        type: 'exclude',
        keys: ['createdAt', 'updatedAt', 'status', 'statusId'],
      }),
    };
  }

  getWhere({ search, statusId }: ClientAllFilterDto): Prisma.ClientWhereInput {
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
}
