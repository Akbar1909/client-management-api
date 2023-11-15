import { Module } from '@nestjs/common';
import { TicketModuleController } from './ticket-side.controller';
import { TicketSideService } from './ticket-side.service';

@Module({
  controllers: [TicketModuleController],
  providers: [TicketSideService],
  exports: [TicketSideService],
})
export class TicketSideModule {}
