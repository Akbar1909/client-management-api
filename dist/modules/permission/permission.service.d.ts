import { PermissionCreateDto, PermissionUpdateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PermissionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        status: string;
        data: {
            id: number;
            key: string;
            description: string | null;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        data: {
            id: number;
            key: string;
            description: string | null;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
    updatePermissionRoles({ roles: rolesIds, ...data }: PermissionUpdateDto, id: number): Promise<{
        status: string;
        data: {
            id: number;
            key: string;
            description: string | null;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deletePermission(id: number): Promise<{
        status: string;
        data: null;
    }>;
    createPermission(dto: PermissionCreateDto): Promise<{
        status: string;
        data: {
            id: number;
            key: string;
            description: string | null;
            label: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getRolesByIds(ids: number[]): Promise<{
        id: number;
        description: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getRolesByPermissionId(id: number): Promise<{
        id: number;
        description: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
