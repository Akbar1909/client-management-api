import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
('@nestjs/platform-express');

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(file: Express.Multer.File) {
    const dbEntity = await this.prisma.upload.create({
      data: {
        filename: file.filename,
        filePath: this.buildFilepath(file.filename),
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      },
    });

    const response = {
      message: 'File uploaded successfully!',
      data: dbEntity,
    };
    return response;
  }

  async findOne(id: number) {
    const dbEntity = await this.prisma.upload.findUnique({ where: { id } });

    if (!dbEntity) {
      throw new NotFoundException(`File with id: ${id} not found`);
    }

    const file = await fs.promises.readFile(
      this.buildFilepath(dbEntity.filename),
    );

    return file;
  }

  buildFilepath(filename: string) {
    return join(__dirname, '..', '..', '..', '..', '/uploads', filename);
  }

  async deleteOne(id: number) {
    const file = await this.prisma.upload.findUnique({ where: { id } });

    if (!file) {
      throw new NotFoundException(`File with the id ${id} not found`);
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await this.prisma.upload.delete({ where: { id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
