import { ClientStatusService } from './client-status.service';
import { ClientStatusCreateDto } from './dto';
export declare class ClientStatusController {
    private readonly clientStatusService;
    constructor(clientStatusService: ClientStatusService);
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
    create(dto: ClientStatusCreateDto): Promise<{
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
    updateOne(dto: ClientStatusCreateDto, id: number): {
        status: string;
        data: Promise<{
            id: number;
            projectId: number | null;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }>;
    };
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
