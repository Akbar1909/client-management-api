import { RoleEntity } from '../role/role.entity';
import { UserEntity } from '../user/user.entity';
export interface AuthEntity extends Pick<UserEntity, 'id' | 'orgId' | 'username'> {
    role: RoleEntity['name'];
}
