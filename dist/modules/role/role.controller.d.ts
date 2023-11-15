import { RoleCreateDto } from './dto/role-create.dto';
import { RoleService } from './role.service';
import { RoleUpdateDto } from './dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
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
    updateRole(id: number, dto: RoleUpdateDto): Promise<{
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
}
