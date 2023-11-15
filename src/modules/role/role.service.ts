import { Injectable } from '@nestjs/common';
import { RoleCreateDto, RoleUpdateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const roles = await this.prisma.role.findMany({
      include: { permissions: true },
    });

    return {
      status: 'success',
      data: roles,
    };
  }

  async create(dto: RoleCreateDto) {
    const { permissions: permissionsIds, ...rest } = dto;
    const hasPermissionsInBody = Array.isArray(permissionsIds);
    const permissions = hasPermissionsInBody
      ? await this.getPermissionsByIds(permissionsIds)
      : [];

    const role = await this.prisma.role.create({
      data: {
        ...rest,
        ...(hasPermissionsInBody && { permissions: { connect: permissions } }),
      },
      include: {
        permissions: true,
      },
    });
    return {
      status: 'success',
      data: role,
    };
  }

  async updateRole(id: number, { permissions, ...dto }: RoleUpdateDto) {
    const hasNewPermissions = Array.isArray(permissions);

    const oldPermissions = hasNewPermissions
      ? await this.getPermissionsByRoleId(id)
      : [];
    const newPermissions = hasNewPermissions
      ? await this.getPermissionsByIds(permissions || [])
      : [];

    const role = await this.prisma.role.update({
      where: { id },
      data: {
        ...dto,
        ...(hasNewPermissions && {
          permissions: {
            disconnect: oldPermissions,
            connect: newPermissions,
          },
        }),
      },
      include: {
        permissions: true,
      },
    });

    return {
      status: 'success',
      data: role,
    };
  }

  async deleteRole(id: number) {
    await this.prisma.role.delete({ where: { id } });

    return {
      status: 'success',
      data: null,
    };
  }

  async getRoleFullInfo(id: number) {
    const permissions = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });

    return {
      status: 'success',
      data: permissions,
    };
  }

  async getPermissionsByIds(ids: number[]) {
    return await this.prisma.permission.findMany({
      where: { id: { in: ids } },
    });
  }

  async getPermissionsByRoleId(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: {
        permissions: true,
      },
    });

    return role?.permissions;
  }
}
