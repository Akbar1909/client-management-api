import { PartialType } from '@nestjs/mapped-types';
import { TicketTypeCreateDto } from './ticket-type-create.dto';

export class TicketTypeUpdateDto extends PartialType(TicketTypeCreateDto) {}
