import { TicketStatus } from '../ticket.entity';
export declare class TicketCreateDto {
    name: string;
    clientId: number;
    operatorId: number;
    developerId: number;
    status: TicketStatus;
    sideId?: number;
    typeId: number;
    telegramMessageId: string;
    description: string;
    attachments: number[];
    bugFixDate: string;
    regDate?: string;
}
