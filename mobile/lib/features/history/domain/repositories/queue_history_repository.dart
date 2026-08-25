import '../entities/queue_history_item.dart';

abstract class QueueHistoryRepository {
  Future<List<QueueHistoryItem>> getMyHistory();
}
