/// <reference types="multer" />
/// <reference types="node" />
import { PrismaService } from '../prisma/prisma.service';
export declare class UploadService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upload(file: Express.Multer.File): Promise<{
        message: string;
        data: {
            id: number;
            ticketId: number | null;
            filename: string;
            originalName: string;
            filePath: string;
            mimetype: string;
            createdAt: Date;
            updatedAt: Date;
            size: number;
        };
    }>;
    findOne(id: number): Promise<Buffer>;
    buildFilepath(filename: string): string;
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
