import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../ticket.entity';

export class TicketUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  operatorId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  developerId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsOptional()
  @IsNotEmpty()
  sideId: number;

  @IsNumber()
  @IsOptional()
  typeId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  telegramMessageId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  attachments: number[];

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  bugFixDate: string;
}
