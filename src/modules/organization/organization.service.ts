import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQuery } from './dto/findAll-query.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const newRecord = await this.prisma.organization.create({
      data: createOrganizationDto,
    });
    return {
      status: 'success',
      data: newRecord,
    };
  }

  async findAll({ page, size }: FindAllQuery) {
    const [records, total] = await this.prisma.$transaction([
      this.prisma.organization.findMany({
        skip: page * size,
        take: size,
      }),
      this.prisma.organization.count(),
    ]);

    return {
      status: 'success',
      data: {
        list: records,
        total,
      },
    };
  }

  async findOne(id: number) {
    const record = await this.prisma.organization.findFirst({
      where: { organizationId: id },
    });
    return {
      status: 'success',
      data: record,
    };
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    let record = await this.prisma.organization.findFirst({
      where: { organizationId: id },
    });

    if (!record) {
      throw new NotFoundException({
        message: `Organization with the ${id} not found`,
      });
    }

    record = await this.prisma.organization.update({
      where: { organizationId: id },
      data: updateOrganizationDto,
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async remove(id: number) {
    await this.prisma.organization.delete({ where: { organizationId: id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
