import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PermissionCreateDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  roles: Array<any>;
}
