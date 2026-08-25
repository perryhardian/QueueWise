import { Module } from '@nestjs/common';
import { QueueRealtimeModule } from '../websocket/queue-realtime.module';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';

@Module({
  imports: [QueueRealtimeModule],
  controllers: [QueuesController],
  providers: [QueuesService],
  exports: [QueuesService],
})
export class QueuesModule {}
