import { TicketStatus } from '../ticket.entity';
export declare class TicketFilterDto {
    page: number;
    size: number;
    clientId: number[];
    typeId: number[];
    developerId: number[];
    regDateGte?: string;
    regDateLte?: string;
    bugFixDateGte?: string;
    bugFixDateLte?: string;
    search?: string;
    status?: TicketStatus[];
    pcCountLte?: number;
    pcCountGte?: number;
    sideId?: number[];
    regDateOrder?: 'asc' | 'desc';
    bugFixDateOrder?: 'asc' | 'desc';
}
