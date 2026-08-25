import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { QueueEventsService } from './queue-events.service';
import { QueueGateway } from './queue.gateway';

@Module({
  imports: [JwtModule.register({})],
  providers: [QueueGateway, QueueEventsService],
  exports: [QueueEventsService],
})
export class QueueRealtimeModule {}
