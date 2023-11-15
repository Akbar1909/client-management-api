import { TicketTypeService } from './ticket-type.service';
import { TicketTypeCreateDto } from './dto';
import { TicketTypeUpdateDto } from './dto/ticket-type-update.dto';
export declare class TicketTypeController {
    private readonly ticketTypeService;
    constructor(ticketTypeService: TicketTypeService);
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
    updateOne(dto: TicketTypeUpdateDto, id: number): {
        status: string;
        data: Promise<{
            id: number;
            projectId: number | null;
            name: string;
            description: string;
            createdAt: Date | null;
            updatedAt: Date | null;
        }>;
    };
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
