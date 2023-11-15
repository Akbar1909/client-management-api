import { TicketSideService } from './ticket-side.service';
import { TicketSideCreateDto } from './dto/ticket-side-create.dto';
import { TicketSideUpdateDto } from './dto';
export declare class TicketModuleController {
    private readonly ticketSideService;
    constructor(ticketSideService: TicketSideService);
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
    updateOne(dto: TicketSideUpdateDto, id: number): {
        status: string;
        data: Promise<{
            id: number;
            projectId: number | null;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        }>;
    };
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
