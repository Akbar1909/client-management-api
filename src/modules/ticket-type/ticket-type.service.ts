import { Injectable } from '@nestjs/common';
import { TicketTypeCreateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { TicketTypeUpdateDto } from './dto/ticket-type-update.dto';
import { TicketTypeEntity } from './entity/ticket-type.entity';

@Injectable()
export class TicketTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const list = await this.prisma.ticketType.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return {
      status: 'success',
      data: list,
    };
  }

  async create(dto: TicketTypeCreateDto) {
    const ticketType = await this.prisma.ticketType.create({ data: dto });

    return {
      status: 'success',
      data: ticketType,
    };
  }

  async updateOne(id: number, dto: TicketTypeUpdateDto) {
    return await this.prisma.ticketType.update({
      where: { id },
      data: dto,
    });
  }

  async updateMany(records: TicketTypeEntity[]) {
    return await Promise.all(
      records
        .filter((record) => record.id)
        .map((record) => this.updateOne(record.id, record)),
    );
  }

  async deleteOne(id: number) {
    await this.prisma.ticketType.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }
}
