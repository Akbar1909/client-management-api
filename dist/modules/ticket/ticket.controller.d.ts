import { TicketService } from './ticket.service';
import { TicketUpdateDto, TicketCreateDto } from './dto';
import { TicketFilterDto } from './dto/ticket-filter.dto';
import { UserEntity } from '../user/user.entity';
import { AuthEntity } from '../auth/auth.entity';
import { TicketDateReportDto } from './dto/ticket-date-report.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    findAll(filterDto: TicketFilterDto, user: AuthEntity): Promise<{
        status: string;
        data: {
            prev: number | null;
            next: number | null;
            page: number;
            size: number;
            count: number;
            total: number;
            list: {
                createdByMe: boolean;
                client: {
                    name: string;
                    pcCount: number;
                    contactPhone: string[];
                    contactName: string;
                };
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
                type: {
                    id: number;
                    projectId: number | null;
                    name: string;
                    description: string;
                    createdAt: Date | null;
                    updatedAt: Date | null;
                } | null;
                side: {
                    id: number;
                    projectId: number | null;
                    name: string;
                    createdAt: Date | null;
                    updatedAt: Date | null;
                } | null;
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
        };
    }>;
    create(dto: TicketCreateDto, user: UserEntity): Promise<{
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
        };
    }>;
    getStatsByStatus(filterDto: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.TicketGroupByOutputType, "status"> & {
            _count: number;
        })[];
    }>;
    getStatsByType(clientId: number): Promise<{
        status: string;
        data: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.TicketGroupByOutputType, "status"> & {
            _count: number;
        })[];
    }>;
    getStatsByClient(filterDto: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getStatsBySide(filterDto: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            label: string;
            value: number;
            count: number;
        }[];
    }>;
    getStatsByDev(filterDto: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getStatsByModule(query: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getBugTicketCount(user: AuthEntity): Promise<{
        status: string;
        data: {
            request: number;
            bug: number;
        };
    }>;
    getBugTicketCountsBySide(user: AuthEntity): Promise<{
        status: string;
        data: never[];
    }>;
    getBugTicketCountsByModule(user: AuthEntity): Promise<{
        status: string;
        data: {
            name: string;
            count: string;
        }[];
    }>;
    getBugTicketCountsByClient(): Promise<{
        status: string;
        data: {
            clientId: number;
        }[];
    }>;
    getBugTicketCountsByDev(): Promise<{
        status: string;
        data: {
            name: string;
            count: string;
        }[];
    }>;
    getBugTicketCountsByOperator(user: AuthEntity): Promise<{
        status: string;
        data: {
            name: string;
            count: string;
        }[];
    }>;
    getRequestTicketsCountByClient(): Promise<{
        status: string;
        data: never[];
    }>;
    getBugTicketsReportByInterval(query: TicketDateReportDto, user: AuthEntity): Promise<{
        status: string;
        data: unknown;
    }>;
    update(id: number, dto: TicketUpdateDto): Promise<{
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
        };
    }>;
    delete(id: number): Promise<{
        status: string;
        data: null;
    }>;
    findOne(id: number): Promise<{
        status: string;
        data: ({
            client: {
                id: number;
                name: string;
            };
            developer: {
                id: number;
            } | null;
            operator: {
                id: number;
            } | null;
            attachments: {
                id: number;
                ticketId: number | null;
                filename: string;
                originalName: string;
                filePath: string;
                mimetype: string;
                createdAt: Date;
                updatedAt: Date;
                size: number;
            }[];
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
        }) | null;
    }>;
}
