import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TicketTypeCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
