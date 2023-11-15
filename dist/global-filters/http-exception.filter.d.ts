import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    catch(exception: HttpException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
