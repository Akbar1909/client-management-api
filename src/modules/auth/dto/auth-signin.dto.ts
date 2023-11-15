import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
