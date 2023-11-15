import OrderEnum from 'src/dto/order';
export declare class ClientAllFilterDto {
    search?: string;
    select?: number;
    contractDueToGte?: string;
    contractDueToLte?: string;
    totalTickets?: OrderEnum;
    pcCount?: OrderEnum;
    statusId?: number[];
    page?: number;
    size?: number;
}
