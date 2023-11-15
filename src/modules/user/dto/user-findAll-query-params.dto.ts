import { IsEnum, IsOptional, IsString } from 'class-validator';
import OrderEnum from 'src/dto/order';

export class UserFindAllQueryParamsDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(OrderEnum)
  @IsOptional()
  openTicketCount?: OrderEnum;
}
