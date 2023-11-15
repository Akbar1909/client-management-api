import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { FindAllQuery } from './dto/findAll-query.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        status: string;
        data: {
            organizationId: number;
            organizationName: string;
            organizationNotes: string;
            createdAt: Date;
            updatedat: Date;
        };
    }>;
    findAll(query: FindAllQuery): Promise<{
        status: string;
        data: {
            list: {
                organizationId: number;
                organizationName: string;
                organizationNotes: string;
                createdAt: Date;
                updatedat: Date;
            }[];
            total: number;
        };
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: {
            organizationId: number;
            organizationName: string;
            organizationNotes: string;
            createdAt: Date;
            updatedat: Date;
        } | null;
    }>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        status: string;
        data: {
            organizationId: number;
            organizationName: string;
            organizationNotes: string;
            createdAt: Date;
            updatedat: Date;
        };
    }>;
    remove(id: string): Promise<{
        status: string;
        data: null;
    }>;
}
