import { Module } from '@nestjs/common';
import { TicketTypeService } from './ticket-type.service';
import { TicketTypeController } from './ticket-type.controller';

@Module({
  controllers: [TicketTypeController],
  providers: [TicketTypeService],
  exports: [TicketTypeService],
})
export class TicketTypeModule {}
