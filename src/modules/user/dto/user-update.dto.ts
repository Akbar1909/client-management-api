import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  clientId?: number;
}
