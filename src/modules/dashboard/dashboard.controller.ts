import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard)
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('client-counts')
  @HttpCode(HttpStatus.OK)
  getClientCounts() {
    return this.dashboardService.getClientCounts();
  }

  @Get('ticket-counts')
  @HttpCode(HttpStatus.OK)
  getTicketCounts() {
    return this.dashboardService.getTicketCounts();
  }
}
