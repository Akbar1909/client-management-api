import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQuery } from './dto/findAll-query.dto';
export declare class OrganizationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findAll({ page, size }: FindAllQuery): Promise<{
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
    findOne(id: number): Promise<{
        status: string;
        data: {
            organizationId: number;
            organizationName: string;
            organizationNotes: string;
            createdAt: Date;
            updatedat: Date;
        } | null;
    }>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        status: string;
        data: {
            organizationId: number;
            organizationName: string;
            organizationNotes: string;
            createdAt: Date;
            updatedat: Date;
        };
    }>;
    remove(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
