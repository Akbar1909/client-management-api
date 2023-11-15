import { TicketCreateDto, TicketUpdateDto } from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { TicketFilterDto } from './dto/ticket-filter.dto';
import { UserEntity } from '../user/user.entity';
import { AuthEntity } from '../auth/auth.entity';
import { TicketDateReportDto } from './dto/ticket-date-report.dto';
import { Prisma } from '@prisma/client';
type CountType<T = string> = {
    name: string;
    count: T;
};
export declare class TicketService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll({ page, size, search, status, regDateOrder, bugFixDateOrder, ...rest }: TicketFilterDto, me: AuthEntity): Promise<{
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
    create({ attachments: attachmentIds, ...rest }: TicketCreateDto, user: UserEntity): Promise<{
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
    updateOne(id: number, { attachments: attachmentIds, ...rest }: TicketUpdateDto): Promise<{
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
    deleteOne(id: number): Promise<{
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
    getRequestTicketsCountByClient(): Promise<{
        status: string;
        data: never[];
    }>;
    getBugTicketsReportByInterval(query: TicketDateReportDto, user: AuthEntity): Promise<{
        status: string;
        data: unknown;
    }>;
    getOpenTicketsCount(): Promise<{
        status: string;
        data: number;
    }>;
    getBugTicketsCount(user: AuthEntity): Promise<{
        status: string;
        data: {
            request: number;
            bug: number;
        };
    }>;
    getBackSideTicketsCount(): Promise<{
        status: string;
        data: number;
    }>;
    getClientSideTicketsCount(): Promise<{
        status: string;
        data: number;
    }>;
    findManyAttachments(ids: number[]): Promise<{
        id: number;
        ticketId: number | null;
        filename: string;
        originalName: string;
        filePath: string;
        mimetype: string;
        createdAt: Date;
        updatedAt: Date;
        size: number;
    }[]>;
    findManyAttachmentsByTicketId(id: number): Promise<{
        id: number;
        ticketId: number | null;
        filename: string;
        originalName: string;
        filePath: string;
        mimetype: string;
        createdAt: Date;
        updatedAt: Date;
        size: number;
    }[]>;
    getStatsBySide(params: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            label: string;
            value: number;
            count: number;
        }[];
    }>;
    getStatsByType(clientId: number): Promise<{
        status: string;
        data: (Prisma.PickEnumerable<Prisma.TicketGroupByOutputType, "status"> & {
            _count: number;
        })[];
    }>;
    getStatsByModule(params: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getStatsByStatus(params: Omit<TicketFilterDto, 'page' | 'size'>, me: AuthEntity): Promise<{
        status: string;
        data: (Prisma.PickEnumerable<Prisma.TicketGroupByOutputType, "status"> & {
            _count: number;
        })[];
    }>;
    getStatsByClient(params: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getStatsByDev(params: TicketFilterDto, me: AuthEntity): Promise<{
        status: string;
        data: {
            value: number;
            label: string;
            count: number;
        }[];
    }>;
    getBugTicketCountBySide(me: AuthEntity): Promise<{
        status: string;
        data: never[];
    }>;
    getBugTicketCountByModule(user: AuthEntity): Promise<{
        status: string;
        data: CountType<string>[];
    }>;
    getBugTicketCountByClient(): Promise<{
        status: string;
        data: {
            clientId: number;
        }[];
    }>;
    getBugTicketCountByDev(): Promise<{
        status: string;
        data: CountType<string>[];
    }>;
    getBugTicketCountByOperator(user: AuthEntity): Promise<{
        status: string;
        data: CountType<string>[];
    }>;
    getWhere({ status, clientId, search, pcCountGte, pcCountLte, developerId, sideId, typeId, regDateGte, regDateLte, bugFixDateGte, bugFixDateLte, ...rest }: Omit<TicketFilterDto, 'page' | 'size'>, me: AuthEntity): any;
}
export {};
