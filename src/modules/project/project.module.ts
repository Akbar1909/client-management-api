import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TicketModule } from '../ticket/ticket.module';
import { TicketSideModule } from '../ticket-side/ticket-side.module';
import { TicketTypeModule } from '../ticket-type/ticket-type.module';
import { ClientStatusModule } from '../client-status/client-status.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    TicketModule,
    TicketSideModule,
    TicketTypeModule,
    ClientStatusModule,
  ],
})
export class ProjectModule {}
