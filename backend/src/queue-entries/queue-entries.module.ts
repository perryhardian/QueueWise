import { Module } from '@nestjs/common';
import { NotificationsFeatureModule } from '../notifications/notifications-feature.module';
import { QueuesModule } from '../queues/queues.module';
import { QueueRealtimeModule } from '../websocket/queue-realtime.module';
import { QueueEntriesController } from './queue-entries.controller';
import { QueueEntriesService } from './queue-entries.service';

@Module({
  imports: [QueuesModule, QueueRealtimeModule, NotificationsFeatureModule],
  controllers: [QueueEntriesController],
  providers: [QueueEntriesService],
  exports: [QueueEntriesService],
})
export class QueueEntriesModule {}
