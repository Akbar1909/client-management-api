import { ClientService } from '../client/client.service';
import { TicketService } from '../ticket/ticket.service';
export declare class DashboardService {
    private readonly clientService;
    private readonly ticketService;
    constructor(clientService: ClientService, ticketService: TicketService);
    getClientCounts(): Promise<{
        status: string;
        data: {
            activePcCount: number | null;
            activeClientCount: number;
            totalPcCount: number | null;
            totalClientCount: number;
        };
    }>;
    getTicketCounts(): Promise<{
        status: string;
        data: {
            open: number;
            clientSide: number;
            serverSide: number;
        };
    }>;
}
