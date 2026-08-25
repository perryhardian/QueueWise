import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/network/dio_provider.dart';
import '../models/queue_history_item_model.dart';

final queueHistoryRemoteDataSourceProvider =
    Provider<QueueHistoryRemoteDataSource>((ref) {
      return QueueHistoryRemoteDataSource(ref.watch(dioProvider));
    });

class QueueHistoryRemoteDataSource {
  const QueueHistoryRemoteDataSource(this._dio);

  final Dio _dio;

  Future<List<QueueHistoryItemModel>> getMyHistory() async {
    final response = await _dio.get<List<dynamic>>('/queue-history/me');
    return response.data!
        .map(
          (item) =>
              QueueHistoryItemModel.fromJson(item as Map<String, dynamic>),
        )
        .toList();
  }
}
