import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/queue_history_item.dart';
import '../../domain/repositories/queue_history_repository.dart';
import '../datasources/queue_history_remote_data_source.dart';

final queueHistoryRepositoryProvider = Provider<QueueHistoryRepository>((ref) {
  return QueueHistoryRepositoryImpl(
    ref.watch(queueHistoryRemoteDataSourceProvider),
  );
});

class QueueHistoryRepositoryImpl implements QueueHistoryRepository {
  const QueueHistoryRepositoryImpl(this._remoteDataSource);

  final QueueHistoryRemoteDataSource _remoteDataSource;

  @override
  Future<List<QueueHistoryItem>> getMyHistory() =>
      _remoteDataSource.getMyHistory();
}
