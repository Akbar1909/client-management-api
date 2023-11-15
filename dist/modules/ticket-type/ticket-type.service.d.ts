import { TicketTypeCreateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { TicketTypeUpdateDto } from './dto/ticket-type-update.dto';
import { TicketTypeEntity } from './entity/ticket-type.entity';
export declare class TicketTypeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            description: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
    }>;
    create(dto: TicketTypeCreateDto): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            description: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        };
    }>;
    updateOne(id: number, dto: TicketTypeUpdateDto): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        description: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    updateMany(records: TicketTypeEntity[]): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        description: string;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
