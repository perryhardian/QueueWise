import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/active_queue_entry.dart';
import '../../domain/repositories/queue_repository.dart';
import '../datasources/queue_remote_data_source.dart';

final queueRepositoryProvider = Provider<QueueRepository>((ref) {
  return QueueRepositoryImpl(ref.watch(queueRemoteDataSourceProvider));
});

class QueueRepositoryImpl implements QueueRepository {
  const QueueRepositoryImpl(this.remoteDataSource);
  final QueueRemoteDataSource remoteDataSource;

  @override
  Future<ActiveQueueEntry> joinQueue(String queueId) => remoteDataSource.joinQueue(queueId);

  @override
  Future<ActiveQueueEntry?> getMyActiveQueue() => remoteDataSource.getMyActiveQueue();

  @override
  Future<ActiveQueueEntry> getQueueEntryStatus(String entryId) => remoteDataSource.getQueueEntryStatus(entryId);

  @override
  Future<ActiveQueueEntry> cancelQueueEntry(String entryId) => remoteDataSource.cancelQueueEntry(entryId);

  @override
  Future<ActiveQueueEntry> checkInQueueEntry(String entryId, String qrCodeToken) => remoteDataSource.checkInQueueEntry(entryId, qrCodeToken);
}
