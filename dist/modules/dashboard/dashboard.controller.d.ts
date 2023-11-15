import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
