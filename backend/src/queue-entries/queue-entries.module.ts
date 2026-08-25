import { Module } from '@nestjs/common';
import { QueuesModule } from '../queues/queues.module';
import { QueueRealtimeModule } from '../websocket/queue-realtime.module';
import { QueueEntriesController } from './queue-entries.controller';
import { QueueEntriesService } from './queue-entries.service';

@Module({
  imports: [QueuesModule, QueueRealtimeModule],
  controllers: [QueueEntriesController],
  providers: [QueueEntriesService],
  exports: [QueueEntriesService],
})
export class QueueEntriesModule {}
