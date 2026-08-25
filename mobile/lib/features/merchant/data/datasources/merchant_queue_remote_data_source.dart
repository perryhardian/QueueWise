import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/network/dio_provider.dart';
import '../models/merchant_queue_dashboard_model.dart';

final merchantQueueRemoteDataSourceProvider =
    Provider<MerchantQueueRemoteDataSource>((ref) {
      return MerchantQueueRemoteDataSource(ref.watch(dioProvider));
    });

class MerchantQueueRemoteDataSource {
  const MerchantQueueRemoteDataSource(this._dio);

  final Dio _dio;

  Future<List<MerchantQueueOverviewModel>> getActiveQueues() async {
    final response = await _dio.get<List<dynamic>>('/merchant/queues');
    return response.data!
        .map(
          (queue) => MerchantQueueOverviewModel.fromJson(
            queue as Map<String, dynamic>,
          ),
        )
        .toList();
  }

  Future<MerchantQueueDashboardModel> getDashboard(String queueId) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/merchant/queues/$queueId/dashboard',
    );
    return MerchantQueueDashboardModel.fromJson(response.data!);
  }

  Future<MerchantAnalyticsModel> getAnalytics(String businessId) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/merchant/businesses/$businessId/analytics',
    );
    return MerchantAnalyticsModel.fromJson(response.data!);
  }

  Future<void> callNext(String queueId) =>
      _dio.post<void>('/merchant/queues/$queueId/call-next');
  Future<void> callEntry(String entryId) =>
      _dio.post<void>('/merchant/queue-entries/$entryId/call');
  Future<void> startService(String entryId) =>
      _dio.post<void>('/merchant/queue-entries/$entryId/start');
  Future<void> completeService(String entryId) =>
      _dio.post<void>('/merchant/queue-entries/$entryId/complete');
  Future<void> markNoShow(String entryId) =>
      _dio.post<void>('/merchant/queue-entries/$entryId/no-show');
  Future<void> skipEntry(String entryId) =>
      _dio.post<void>('/merchant/queue-entries/$entryId/skip');
}
