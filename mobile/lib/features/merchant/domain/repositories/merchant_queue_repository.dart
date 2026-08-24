import '../entities/merchant_queue_dashboard.dart';

abstract class MerchantQueueRepository {
  Future<List<MerchantQueueOverview>> getActiveQueues();
  Future<MerchantQueueDashboard> getDashboard(String queueId);
  Future<void> callNext(String queueId);
  Future<void> callEntry(String entryId);
  Future<void> startService(String entryId);
  Future<void> completeService(String entryId);
  Future<void> markNoShow(String entryId);
  Future<void> skipEntry(String entryId);
}