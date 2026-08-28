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
    final response = await _dio.post<Map<String, dynamic>>(
      '/queues/$queueId/join',
      data: const <String, dynamic>{},
    );
    return ActiveQueueEntryModel.fromJson(response.data!);
  }

  Future<ActiveQueueEntryModel?> getMyActiveQueue() async {
    final response = await _dio.get<dynamic>('/queue-entries/me/active');
    return parseActiveQueueEntryResponse(response.data);
  }

  Future<ActiveQueueEntryModel> getQueueEntryStatus(String entryId) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/queue-entries/$entryId/status',
    );
    return ActiveQueueEntryModel.fromJson(response.data!);
  }

  Future<ActiveQueueEntryModel> cancelQueueEntry(String entryId) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/queue-entries/$entryId/cancel',
    );
    return ActiveQueueEntryModel.fromJson(response.data!);
  }

  Future<ActiveQueueEntryModel> checkInQueueEntry(
    String entryId,
    String qrCodeToken,
  ) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/queue-entries/$entryId/check-in',
      data: {'qrCodeToken': qrCodeToken},
    );
    return ActiveQueueEntryModel.fromJson(response.data!);
  }
}

ActiveQueueEntryModel? parseActiveQueueEntryResponse(Object? data) {
  if (data == null || (data is String && data.trim().isEmpty)) {
    return null;
  }
  if (data is Map<String, dynamic>) {
    return ActiveQueueEntryModel.fromJson(data);
  }
  throw const FormatException('Invalid active queue response.');
}
