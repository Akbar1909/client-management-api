import { IsNotEmpty, IsString } from 'class-validator';

export class ClientStatusCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string | null;
}
