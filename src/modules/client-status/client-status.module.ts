import { Module } from '@nestjs/common';
import { ClientStatusController } from './client-status.controller';
import { ClientStatusService } from './client-status.service';

@Module({
  controllers: [ClientStatusController],
  providers: [ClientStatusService],
  exports: [ClientStatusService],
})
export class ClientStatusModule {}
