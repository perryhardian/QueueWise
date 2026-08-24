import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/network/dio_provider.dart';
import '../models/active_queue_entry_model.dart';

final queueRemoteDataSourceProvider = Provider<QueueRemoteDataSource>((ref) {
  return QueueRemoteDataSource(ref.watch(dioProvider));
});

class QueueRemoteDataSource {
  const QueueRemoteDataSource(this._dio);
  final Dio _dio;

  Future<ActiveQueueEntryModel> joinQueue(String queueId) async {
    final response = await _dio.post<Map<String, dynamic>>('/queues/$queueId/join', data: const <String, dynamic>{});
    return ActiveQueueEntryModel.fromJson(response.data!);
  }

  Future<ActiveQueueEntryModel?> getMyActiveQueue() async {
    final response = await _dio.get<dynamic>('/queue-entries/me/active');
    if (response.data == null) return null;
    return ActiveQueueEntryModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<ActiveQueueEntryModel> getQueueEntryStatus(String entryId) async {
    final response = await _dio.get<Map<String, dynamic>>('/queue-entries/$entryId/status');
    return ActiveQueueEntryModel.fromJson(response.data!);
  }

  Future<ActiveQueueEntryModel> cancelQueueEntry(String entryId) async {
    final response = await _dio.post<Map<String, dynamic>>('/queue-entries/$entryId/cancel');
    return ActiveQueueEntryModel.fromJson(response.data!);
  }
}