import type { Server } from 'socket.io';
export type QueueEventName = 'queue.joined' | 'queue.checked_in' | 'queue.called' | 'queue.serving' | 'queue.completed' | 'queue.cancelled' | 'queue.no_show' | 'queue.updated';
export interface QueueEventPayload {
    queueId: string;
    businessId?: string;
    entryId?: string;
    userId?: string | null;
    event: QueueEventName;
}
export declare class QueueEventsService {
    private server?;
    attachServer(server: Server): void;
    emitQueueEvent(payload: QueueEventPayload): void;
    private emitToRooms;
}
