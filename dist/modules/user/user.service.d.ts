import { UserCreateDto, UserFindAllQueryParamsDto, UserUpdateDto, UserUpdateRoleDto } from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserEntity } from './user.entity';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll({ search, openTicketCount }: UserFindAllQueryParamsDto): Promise<{
        status: string;
        data: any;
    }>;
    findOptions(): Promise<{
        status: string;
        data: {
            id: number;
            firstName: string;
            lastName: string;
        }[];
    }>;
    findOne(id: number): Promise<{
        data: {
            clientId: number | null;
        };
        status: string;
    }>;
    findMe(user: UserEntity): Promise<{
        status: string;
        data: {
            role: {
                id: number;
                description: string | null;
                name: string;
                createdAt: Date;
                updatedAt: Date;
            };
            permissions: {
                id: number;
                key: string;
                description: string | null;
                label: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            client: {} | null;
            id: number;
            username: string;
            hash: string;
            roleId: number;
            firstName: string;
            lastName: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
            orgId: number | null;
        };
    }>;
    create(dto: UserCreateDto): Promise<{
        status: string;
        data: {
            role: {
                name: string;
            };
            username: string;
            firstName: string;
            lastName: string;
        };
    }>;
    update({ id, ...rest }: UserUpdateDto): Promise<{
        status: string;
        data: {
            id: number;
            username: string;
            hash: string;
            roleId: number;
            firstName: string;
            lastName: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
            orgId: number | null;
        };
    }>;
    deleteUser(id: number): Promise<{
        status: string;
        data: null;
    }>;
    updateRole(id: number, dto: UserUpdateRoleDto): Promise<{
        status: string;
        data: {
            id: number;
            username: string;
            hash: string;
            roleId: number;
            firstName: string;
            lastName: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
            orgId: number | null;
        };
    }>;
    checkUserAlreadyExists(username: string): Promise<{
        id: number;
        username: string;
        hash: string;
        roleId: number;
        firstName: string;
        lastName: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        refreshToken: string | null;
        orgId: number | null;
    } | null>;
}
