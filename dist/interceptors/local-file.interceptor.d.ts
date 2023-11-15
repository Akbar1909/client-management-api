import { NestInterceptor, Type } from '@nestjs/common';
interface LocalFilesInterceptorOptions {
    fieldName: string;
    path?: string;
}
declare function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor>;
export default LocalFilesInterceptor;
