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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoleService = class RoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const roles = await this.prisma.role.findMany({
            include: { permissions: true },
        });
        return {
            status: 'success',
            data: roles,
        };
    }
    async create(dto) {
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
    async updateRole(id, { permissions, ...dto }) {
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
    async deleteRole(id) {
        await this.prisma.role.delete({ where: { id } });
        return {
            status: 'success',
            data: null,
        };
    }
    async getRoleFullInfo(id) {
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
    async getPermissionsByIds(ids) {
        return await this.prisma.permission.findMany({
            where: { id: { in: ids } },
        });
    }
    async getPermissionsByRoleId(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            select: {
                permissions: true,
            },
        });
        return role?.permissions;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map