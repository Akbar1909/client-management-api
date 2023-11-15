import { PartialType } from '@nestjs/mapped-types';
import { RoleCreateDto } from './role-create.dto';

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}
