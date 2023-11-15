import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import OrderEnum from 'src/dto/order';

export class ClientAllFilterDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  select?: number;

  @IsString()
  @IsOptional()
  contractDueToGte?: string;

  @IsString()
  @IsOptional()
  contractDueToLte?: string;

  @IsEnum(OrderEnum)
  @IsOptional()
  totalTickets?: OrderEnum;

  @IsEnum(OrderEnum)
  @IsOptional()
  pcCount?: OrderEnum;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  statusId?: number[];

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  size?: number;
}
