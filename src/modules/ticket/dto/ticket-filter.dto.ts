import { TicketStatus } from '../ticket.entity';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TicketFilterDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  size: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  clientId: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  typeId: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  developerId: number[];

  @IsString()
  @IsOptional()
  regDateGte?: string;

  @IsString()
  @IsOptional()
  regDateLte?: string;

  @IsString()
  @IsOptional()
  bugFixDateGte?: string;

  @IsString()
  @IsOptional()
  bugFixDateLte?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(TicketStatus, { each: true })
  @IsOptional()
  status?: TicketStatus[];

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pcCountLte?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pcCountGte?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  sideId?: number[];

  @IsString()
  @IsOptional()
  regDateOrder?: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  bugFixDateOrder?: 'asc' | 'desc';
}
