import { Module } from '@nestjs/common';
import { QueuesModule } from '../queues/queues.module';
import { QueueEntriesController } from './queue-entries.controller';
import { QueueEntriesService } from './queue-entries.service';

@Module({
  imports: [QueuesModule],
  controllers: [QueueEntriesController],
  providers: [QueueEntriesService],
  exports: [QueueEntriesService],
})
export class QueueEntriesModule {}