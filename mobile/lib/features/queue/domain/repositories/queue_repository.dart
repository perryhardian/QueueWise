import '../entities/active_queue_entry.dart';

abstract class QueueRepository {
  Future<ActiveQueueEntry> joinQueue(String queueId);
  Future<ActiveQueueEntry?> getMyActiveQueue();
  Future<ActiveQueueEntry> getQueueEntryStatus(String entryId);
  Future<ActiveQueueEntry> cancelQueueEntry(String entryId);
  Future<ActiveQueueEntry> checkInQueueEntry(String entryId, String qrCodeToken);
}
