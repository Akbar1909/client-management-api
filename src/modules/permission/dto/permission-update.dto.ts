import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PermissionUpdateDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  label?: string;

  @IsArray()
  @IsOptional()
  roles: Array<number>;
}
