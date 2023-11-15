import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class ClientCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  contactPhone: string[];

  @IsString()
  contactName: string;

  @IsString()
  linuxUsername: string;

  @IsString()
  linuxPassword: string;

  @IsString()
  dlpUsername: string;

  @IsString()
  @IsOptional()
  dlpPassword: string;

  @IsNumber()
  pcCount: number;

  @IsArray()
  @IsOptional()
  serverAddress: string[];

  @IsString()
  @IsOptional()
  hardwareId: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNumber()
  @IsOptional()
  statusId: number;

  @IsString()
  @IsOptional()
  contractDueTo: string;

  @IsString()
  @IsOptional()
  tgGroupId: string;
}
