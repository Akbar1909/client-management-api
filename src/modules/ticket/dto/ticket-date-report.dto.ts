import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class TicketDateReportDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  year?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  month?: number;
}
