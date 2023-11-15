import { IsNumber } from 'class-validator';

export class FindAllQuery {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;
}
