import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { TicketService } from '../ticket/ticket.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly clientService: ClientService,
    private readonly ticketService: TicketService,
  ) {}

  async getClientCounts() {
    const [active, total] = await Promise.all([
      this.clientService.getActivePcAndClientCount(),
      this.clientService.getTotalPcAndClientCount(),
    ]);

    const data = {
      activePcCount: active.data.pcCount,
      activeClientCount: active.data.clientCount,
      totalPcCount: total.data.pcCount,
      totalClientCount: total.data.clientCount,
    };

    return {
      status: 'success',
      data,
    };
  }

  async getTicketCounts() {
    const [open, clientSide, serverSide] = await Promise.all([
      this.ticketService.getOpenTicketsCount(),
      this.ticketService.getClientSideTicketsCount(),
      this.ticketService.getBackSideTicketsCount(),
    ]);

    return {
      status: 'success',
      data: {
        open: open.data,
        clientSide: clientSide.data,
        serverSide: serverSide.data,
      },
    };
  }
}
