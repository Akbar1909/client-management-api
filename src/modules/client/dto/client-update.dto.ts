import { PartialType } from '@nestjs/mapped-types';
import { ClientCreateDto } from './client-create.dto';

export class ClientUpdateDto extends PartialType(ClientCreateDto) {}
