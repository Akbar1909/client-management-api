import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RoleCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  permissions: Array<number>;

  // @IsString()
  // @IsNotEmpty()
  // nameUz: string;

  // @IsString()
  // @IsNotEmpty()
  // nameRu: string;
}
