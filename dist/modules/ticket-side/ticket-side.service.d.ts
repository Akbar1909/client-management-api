import { PrismaService } from '../prisma/prisma.service';
import { TicketSideCreateDto, TicketSideUpdateDto } from './dto';
import { TicketSideEntity } from './entity/ticket-side.entity';
export declare class TicketSideService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
    }>;
    createOne(dto: TicketSideCreateDto): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    }>;
    updateOne(dto: TicketSideUpdateDto, id: number): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    updateMany(records: TicketSideEntity[]): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
