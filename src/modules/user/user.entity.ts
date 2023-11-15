import { RoleEntity } from '../role/role.entity';

export interface UserEntity {
  id: number;
  username: string;
  hash: string;
  roleId: number;
  firstName: string;
  lastName: string;
  orgId: number | null;
  role?: RoleEntity;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string | null;
}
