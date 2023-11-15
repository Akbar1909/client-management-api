import { PermissionService } from './permission.service';
import { PermissionCreateDto, PermissionUpdateDto } from './dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
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
    updatePermission(dto: PermissionUpdateDto, id: number): Promise<{
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
}
