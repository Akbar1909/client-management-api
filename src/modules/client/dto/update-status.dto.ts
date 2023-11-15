import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStatusDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}
