/// <reference types="multer" />
/// <reference types="node" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
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
    readOne(id: number): Promise<Buffer>;
    deleteOne(id: number): Promise<{
        status: string;
        data: null;
    }>;
}
