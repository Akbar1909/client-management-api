import { PartialType } from '@nestjs/mapped-types';
import { ClientStatusCreateDto } from './client-status-create.dto';

export class ClientStatusUpdateDto extends PartialType(ClientStatusCreateDto) {}
