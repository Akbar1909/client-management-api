import { ClientStatusEntity } from 'src/modules/client-status/entity/client-status.entity';
import { TicketSideEntity } from 'src/modules/ticket-side/entity/ticket-side.entity';
import { TicketTypeEntity } from 'src/modules/ticket-type/entity/ticket-type.entity';
export declare class CreateProjectDto {
    projectName: string;
    hasSide?: boolean;
    hasModule?: boolean;
    hasClientStatus?: boolean;
    sides?: TicketSideEntity[];
    modules?: TicketTypeEntity[];
    clientStatuses?: ClientStatusEntity[];
}
