import { QueueEntryStatus } from '../generated/prisma/enums';

export const activeQueueEntryStatuses = [
  QueueEntryStatus.WAITING,
  QueueEntryStatus.CHECKED_IN,
  QueueEntryStatus.CALLED,
  QueueEntryStatus.SERVING,
];

export function formatQueueNumber(sequenceNumber: number, prefix = 'A') {
  return `${prefix}${String(sequenceNumber).padStart(3, '0')}`;
}

export function estimateWaitMinutes(peopleAhead: number, averageServiceTimeMinutes: number) {
  return peopleAhead * averageServiceTimeMinutes;
}