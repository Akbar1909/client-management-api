import { PartialType } from '@nestjs/mapped-types';
import { TicketSideCreateDto } from './ticket-side-create.dto';

export class TicketSideUpdateDto extends PartialType(TicketSideCreateDto) {}
