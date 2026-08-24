import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/merchant_queue_dashboard.dart';
import '../../domain/repositories/merchant_queue_repository.dart';
import '../datasources/merchant_queue_remote_data_source.dart';

final merchantQueueRepositoryProvider = Provider<MerchantQueueRepository>((ref) {
  return MerchantQueueRepositoryImpl(ref.watch(merchantQueueRemoteDataSourceProvider));
});

class MerchantQueueRepositoryImpl implements MerchantQueueRepository {
  const MerchantQueueRepositoryImpl(this._remoteDataSource);

  final MerchantQueueRemoteDataSource _remoteDataSource;

  @override
  Future<List<MerchantQueueOverview>> getActiveQueues() => _remoteDataSource.getActiveQueues();

  @override
  Future<MerchantQueueDashboard> getDashboard(String queueId) => _remoteDataSource.getDashboard(queueId);

  @override
  Future<void> callNext(String queueId) => _remoteDataSource.callNext(queueId);

  @override
  Future<void> callEntry(String entryId) => _remoteDataSource.callEntry(entryId);

  @override
  Future<void> startService(String entryId) => _remoteDataSource.startService(entryId);

  @override
  Future<void> completeService(String entryId) => _remoteDataSource.completeService(entryId);

  @override
  Future<void> markNoShow(String entryId) => _remoteDataSource.markNoShow(entryId);

  @override
  Future<void> skipEntry(String entryId) => _remoteDataSource.skipEntry(entryId);
}