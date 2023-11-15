import { PrismaService } from '../prisma/prisma.service';
import { ClientStatusCreateDto, ClientStatusUpdateDto } from './dto';
import { ClientStatusEntity } from './entity/client-status.entity';
export declare class ClientStatusService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createOne(dto: ClientStatusCreateDto): Promise<{
        status: string;
        data: {
            id: number;
            projectId: number | null;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateOne(dto: ClientStatusUpdateDto, id: number): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMany(records: ClientStatusEntity[]): Promise<{
        id: number;
        projectId: number | null;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
