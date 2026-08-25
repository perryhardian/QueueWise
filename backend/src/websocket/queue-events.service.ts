import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

export type QueueEventName =
  | 'queue.joined'
  | 'queue.checked_in'
  | 'queue.called'
  | 'queue.serving'
  | 'queue.completed'
  | 'queue.cancelled'
  | 'queue.no_show'
  | 'queue.updated';

export interface QueueEventPayload {
  queueId: string;
  businessId?: string;
  entryId?: string;
  userId?: string | null;
  event: QueueEventName;
}

@Injectable()
export class QueueEventsService {
  private server?: Server;

  attachServer(server: Server) {
    this.server = server;
  }

  emitQueueEvent(payload: QueueEventPayload) {
    if (!this.server) return;

    this.emitToRooms(payload.event, payload);
    if (payload.event !== 'queue.updated') {
      this.emitToRooms('queue.updated', { ...payload, event: 'queue.updated' });
    }
  }

  private emitToRooms(event: QueueEventName, payload: QueueEventPayload) {
    if (!this.server) return;
    this.server.to(`queue:${payload.queueId}`).emit(event, payload);

    if (payload.businessId) {
      this.server.to(`business:${payload.businessId}`).emit(event, payload);
    }

    if (payload.userId) {
      this.server.to(`user:${payload.userId}`).emit(event, payload);
    }
  }
}
