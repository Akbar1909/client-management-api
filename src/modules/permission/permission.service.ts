import { Injectable } from '@nestjs/common';
import { PermissionCreateDto, PermissionUpdateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const permissions = await this.prisma.permission.findMany();

    return {
      status: 'success',
      data: permissions,
    };
  }

  async findOne(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    return {
      status: 'success',
      data: permission,
    };
  }

  async updatePermissionRoles(
    { roles: rolesIds, ...data }: PermissionUpdateDto,
    id: number,
  ) {
    const hasNewRolesInBody = Array.isArray(rolesIds);
    const newRoles = hasNewRolesInBody
      ? await this.getRolesByIds(rolesIds)
      : [];
    const oldRoles = hasNewRolesInBody
      ? await this.getRolesByPermissionId(id)
      : [];

    const updatedPermission = await this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(hasNewRolesInBody && {
          roles: {
            disconnect: oldRoles,
            connect: newRoles,
          },
        }),
      },
    });

    return {
      status: 'success',
      data: updatedPermission,
    };
  }

  async deletePermission(id: number) {
    await this.prisma.permission.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }

  async createPermission(dto: PermissionCreateDto) {
    const { roles: roleIds, ...data } = dto;
    const roles = await this.getRolesByIds(roleIds);
    const permission = await this.prisma.permission.create({
      data: {
        ...data,
        roles: {
          connect: roles,
        },
      },
    });

    return {
      status: 'success',
      data: permission,
    };
  }

  async getRolesByIds(ids: number[]) {
    return await this.prisma.role.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async getRolesByPermissionId(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
      select: {
        roles: true,
      },
    });

    return permission?.roles || [];
  }
}
