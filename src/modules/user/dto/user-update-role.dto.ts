import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserUpdateRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @IsNotEmpty()
  roleId: number;
}
