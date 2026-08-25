import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/queue_history_repository_impl.dart';
import '../../domain/entities/queue_history_item.dart';

final queueHistoryControllerProvider =
    FutureProvider.autoDispose<List<QueueHistoryItem>>((ref) {
      return ref.watch(queueHistoryRepositoryProvider).getMyHistory();
    });
