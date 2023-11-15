import { IsString, IsNotEmpty } from 'class-validator';

export class TicketSideCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
