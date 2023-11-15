import { ClientService } from './client.service';
import { UpdateStatusDto, ClientCreateDto, ClientUpdateDto, ClientAllFilterDto } from './dto';
import { UserEntity } from '../user/user.entity';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    findAll(query: ClientAllFilterDto, user: UserEntity): Promise<{
        status: string;
        data: {
            list: {
                createdByMe: boolean;
                status: string;
            }[] | {
                id: number;
                name: string;
            }[];
            total: number;
        };
    }>;
    getStatsByStatusId(query: ClientAllFilterDto): Promise<{
        status: string;
        data: {
            value: number;
            count: number;
            label: string;
        }[];
    }>;
    getActiveClientsCount(): Promise<{
        status: string;
        data: {
            active: number;
            deActive: number;
        };
    }>;
    findOne(id: number): Promise<{
        status: string;
        data: ({
            tickets: ({
                developer: {
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
                } | null;
                operator: {
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
                } | null;
                type: {
                    id: number;
                    projectId: number | null;
                    name: string;
                    description: string;
                    createdAt: Date | null;
                    updatedAt: Date | null;
                } | null;
            } & {
                id: number;
                clientId: number;
                operatorId: number | null;
                developerId: number | null;
                status: import(".prisma/client").$Enums.TicketStatus;
                telegramMessageId: string;
                description: string;
                bugFixDate: Date | null;
                createdAt: Date;
                updatedAt: Date;
                regDate: Date;
                sideId: number | null;
                name: string;
                prevStatus: import(".prisma/client").$Enums.TicketStatus;
                typeId: number | null;
            })[];
        } & {
            id: number;
            organizationId: number | null;
            projectId: number | null;
            name: string;
            contactName: string;
            pcCount: number;
            hardwareId: string;
            notes: string;
            contractDueTo: Date | null;
            tgGroupId: string;
            createdAt: Date;
            updatedAt: Date;
            dlpPassword: string;
            dlpUsername: string;
            linuxPassword: string;
            linuxUsername: string;
            contactPhone: string[];
            serverAddress: string[];
            statusId: number;
            createdById: number;
            userId: number | null;
        }) | null;
    }>;
    create(dto: ClientCreateDto, user: UserEntity): Promise<{
        status: string;
        data: {
            createdByMe: boolean;
            status: string;
        };
    }>;
    updateStatus(dto: UpdateStatusDto): Promise<{
        status: string;
        data: {
            status: {
                id: number;
                projectId: number | null;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            organizationId: number | null;
            projectId: number | null;
            name: string;
            contactName: string;
            pcCount: number;
            hardwareId: string;
            notes: string;
            contractDueTo: Date | null;
            tgGroupId: string;
            createdAt: Date;
            updatedAt: Date;
            dlpPassword: string;
            dlpUsername: string;
            linuxPassword: string;
            linuxUsername: string;
            contactPhone: string[];
            serverAddress: string[];
            statusId: number;
            createdById: number;
            userId: number | null;
        };
    }>;
    update(dto: ClientUpdateDto, id: number): Promise<{
        status: string;
        data: {
            id: number;
            organizationId: number | null;
            projectId: number | null;
            name: string;
            contactName: string;
            pcCount: number;
            hardwareId: string;
            notes: string;
            contractDueTo: Date | null;
            tgGroupId: string;
            createdAt: Date;
            updatedAt: Date;
            dlpPassword: string;
            dlpUsername: string;
            linuxPassword: string;
            linuxUsername: string;
            contactPhone: string[];
            serverAddress: string[];
            statusId: number;
            createdById: number;
            userId: number | null;
        };
    }>;
    getTickets(id: number): Promise<{
        status: string;
        data: {
            id: number;
            clientId: number;
            operatorId: number | null;
            developerId: number | null;
            status: import(".prisma/client").$Enums.TicketStatus;
            telegramMessageId: string;
            description: string;
            bugFixDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            regDate: Date;
            sideId: number | null;
            name: string;
            prevStatus: import(".prisma/client").$Enums.TicketStatus;
            typeId: number | null;
        }[];
    }>;
    delete(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
