import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TicketSideService } from '../ticket-side/ticket-side.service';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { ClientStatusService } from '../client-status/client-status.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketTypeService: TicketTypeService,
    private readonly ticketSideService: TicketSideService,
    private readonly clientStatusService: ClientStatusService,
  ) {}

  async create({ sides, clientStatuses, modules, ...rest }: CreateProjectDto) {
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

  async findOne(id: number) {
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

  async update(
    id: number,
    {
      sides = [],
      modules = [],
      clientStatuses = [],
      ...rest
    }: UpdateProjectDto,
  ) {
    const record = await this.prisma.project.update({
      where: { projectId: id },
      data: {
        ...rest,
        sides: {
          create: sides?.filter((side) => !side.id),
          connect: (await this.ticketSideService.updateMany(sides))?.map(
            (side) => ({ id: side.id }),
          ),
        },
        modules: {
          create: modules?.filter((side) => !side.id),
          connect: (await this.ticketTypeService.updateMany(modules))?.map(
            (side) => ({ id: side.id }),
          ),
        },
        clientStatuses: {
          create: clientStatuses?.filter((clientStatus) => !clientStatus.id),
          connect: (
            await this.clientStatusService.updateMany(clientStatuses)
          )?.map((clientStatus) => ({ id: clientStatus.id })),
        },
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async remove(id: number) {
    await this.prisma.project.delete({ where: { projectId: id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
