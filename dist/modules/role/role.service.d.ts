import { RoleCreateDto, RoleUpdateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class RoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        status: string;
        data: ({
            permissions: {
                id: number;
                key: string;
                description: string | null;
                label: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            description: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    create(dto: RoleCreateDto): Promise<{
        status: string;
        data: {
            permissions: {
                id: number;
                key: string;
                description: string | null;
                label: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            description: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateRole(id: number, { permissions, ...dto }: RoleUpdateDto): Promise<{
        status: string;
        data: {
            permissions: {
                id: number;
                key: string;
                description: string | null;
                label: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            description: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteRole(id: number): Promise<{
        status: string;
        data: null;
    }>;
    getRoleFullInfo(id: number): Promise<{
        status: string;
        data: ({
            permissions: {
                id: number;
                key: string;
                description: string | null;
                label: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            description: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }) | null;
    }>;
    getPermissionsByIds(ids: number[]): Promise<{
        id: number;
        key: string;
        description: string | null;
        label: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getPermissionsByRoleId(id: number): Promise<{
        id: number;
        key: string;
        description: string | null;
        label: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[] | undefined>;
}
