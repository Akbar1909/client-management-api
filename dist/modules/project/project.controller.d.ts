import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
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
    remove(id: string): Promise<{
        status: string;
        data: null;
    }>;
}
