import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TicketSideService } from '../ticket-side/ticket-side.service';
import { TicketTypeService } from '../ticket-type/ticket-type.service';
import { ClientStatusService } from '../client-status/client-status.service';
export declare class ProjectService {
    private readonly prisma;
    private readonly ticketTypeService;
    private readonly ticketSideService;
    private readonly clientStatusService;
    constructor(prisma: PrismaService, ticketTypeService: TicketTypeService, ticketSideService: TicketSideService, clientStatusService: ClientStatusService);
    create({ sides, clientStatuses, modules, ...rest }: CreateProjectDto): Promise<{
        status: string;
        data: {
            projectId: number;
            projectName: string;
            hasSide: boolean;
            hasModule: boolean;
            hasClientStatus: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(): Promise<{
        status: string;
        data: ({
            sides: {
                id: number;
                projectId: number | null;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
            }[];
            clientStatuses: {
                id: number;
                projectId: number | null;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            modules: {
                id: number;
                projectId: number | null;
                name: string;
                description: string;
                createdAt: Date | null;
                updatedAt: Date | null;
            }[];
        } & {
            projectId: number;
            projectName: string;
            hasSide: boolean;
            hasModule: boolean;
            hasClientStatus: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: number): Promise<{
        status: string;
        data: ({
            sides: {
                id: number;
                projectId: number | null;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
            }[];
            clientStatuses: {
                id: number;
                projectId: number | null;
                name: string;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            modules: {
                id: number;
                projectId: number | null;
                name: string;
                description: string;
                createdAt: Date | null;
                updatedAt: Date | null;
            }[];
        } & {
            projectId: number;
            projectName: string;
            hasSide: boolean;
            hasModule: boolean;
            hasClientStatus: boolean;
            createdAt: Date;
            updatedAt: Date;
        }) | null;
    }>;
    update(id: number, { sides, modules, clientStatuses, ...rest }: UpdateProjectDto): Promise<{
        status: string;
        data: {
            projectId: number;
            projectName: string;
            hasSide: boolean;
            hasModule: boolean;
            hasClientStatus: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
