import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../ticket.entity';

export class TicketCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  operatorId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  developerId: number;

  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;

  @IsNotEmpty()
  @IsOptional()
  sideId?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  typeId: number;

  @IsString()
  @IsNotEmpty()
  telegramMessageId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  attachments: number[];

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bugFixDate: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  regDate?: string;
}
