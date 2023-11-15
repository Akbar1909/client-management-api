import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
export declare function format(date: Date | number, separator?: string): string;
export declare function subtract5Hours(date: Date): Date;
export declare function formatDate(date: string | Date, format?: string): string;
export default dayjs;
