import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private configService;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: any, host: ArgumentsHost): void;
    private prepareValidationErrorObj;
    private isCustomException;
}
