import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicketSideCreateDto, TicketSideUpdateDto } from './dto';
import { TicketSideEntity } from './entity/ticket-side.entity';

@Injectable()
export class TicketSideService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.ticketSide.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return {
      status: 'success',
      data,
    };
  }

  async createOne(dto: TicketSideCreateDto) {
    const newEntity = await this.prisma.ticketSide.create({ data: dto });

    return {
      status: 'success',
      data: newEntity,
    };
  }

  async updateOne(dto: TicketSideUpdateDto, id: number) {
    const updatedItem = await this.prisma.ticketSide.update({
      where: { id },
      data: dto,
    });

    return updatedItem;
  }

  async updateMany(records: TicketSideEntity[]) {
    return await Promise.all(
      records
        .filter((record) => record.id)
        .map((record) => this.updateOne(record, record.id)),
    );
  }

  async deleteOne(id: number) {
    await this.prisma.ticketSide.delete({ where: { id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
