import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ClientModule } from '../client/client.module';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [ClientModule, TicketModule],
})
export class DashboardModule {}
