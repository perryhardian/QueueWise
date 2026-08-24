import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/queue_repository_impl.dart';
import '../../domain/entities/active_queue_entry.dart';
import '../../domain/repositories/queue_repository.dart';

final activeQueueControllerProvider = AsyncNotifierProvider<ActiveQueueController, ActiveQueueEntry?>(ActiveQueueController.new);

class ActiveQueueController extends AsyncNotifier<ActiveQueueEntry?> {
  late final QueueRepository _repository;

  @override
  Future<ActiveQueueEntry?> build() async {
    _repository = ref.watch(queueRepositoryProvider);
    return _repository.getMyActiveQueue();
  }

  Future<ActiveQueueEntry> joinQueue(String queueId) async {
    state = const AsyncLoading();
    final result = await AsyncValue.guard(() => _repository.joinQueue(queueId));
    state = result;
    return result.requireValue;
  }

  Future<void> refreshStatus() async {
    final entry = state.valueOrNull;
    if (entry == null) {
      ref.invalidateSelf();
      return;
    }
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => _repository.getQueueEntryStatus(entry.id));
  }

  Future<void> cancelQueue() async {
    final entry = state.valueOrNull;
    if (entry == null) return;
    state = const AsyncLoading();
    await _repository.cancelQueueEntry(entry.id);
    state = const AsyncData(null);
  }
}