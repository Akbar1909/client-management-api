import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientStatusCreateDto, ClientStatusUpdateDto } from './dto';
import { ClientStatusEntity } from './entity/client-status.entity';
@Injectable()
export class ClientStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const list = await this.prisma.clientStatus.findMany();

    return {
      status: 'success',
      data: list,
    };
  }

  async createOne(dto: ClientStatusCreateDto) {
    const clientStatus = await this.prisma.clientStatus.create({ data: dto });

    return {
      status: 'success',
      data: clientStatus,
    };
  }

  async updateOne(dto: ClientStatusUpdateDto, id: number) {
    return await this.prisma.clientStatus.update({
      where: { id },
      data: dto,
    });
  }

  async updateMany(records: ClientStatusEntity[]) {
    return await Promise.all(
      records
        .filter((record) => record.id)
        .map((record) => this.updateOne(record, record.id)),
    );
  }

  async deleteOne(id: number) {
    await this.prisma.clientStatus.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }
}
