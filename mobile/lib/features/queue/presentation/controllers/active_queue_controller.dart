import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/realtime/queue_realtime_service.dart';
import '../../data/repositories/queue_repository_impl.dart';
import '../../domain/entities/active_queue_entry.dart';
import '../../domain/repositories/queue_repository.dart';

final activeQueueControllerProvider = AsyncNotifierProvider<ActiveQueueController, ActiveQueueEntry?>(ActiveQueueController.new);

class ActiveQueueController extends AsyncNotifier<ActiveQueueEntry?> {
  late final QueueRepository _repository;
  late final QueueRealtimeService _realtimeService;
  StreamSubscription<QueueRealtimeEvent>? _realtimeSubscription;

  @override
  Future<ActiveQueueEntry?> build() async {
    _repository = ref.watch(queueRepositoryProvider);
    _realtimeService = ref.watch(queueRealtimeServiceProvider);
    _realtimeSubscription?.cancel();
    _realtimeSubscription = _realtimeService.events.listen(_handleRealtimeEvent);
    ref.onDispose(() => _realtimeSubscription?.cancel());

    await _realtimeService.connect();
    final entry = await _repository.getMyActiveQueue();
    if (entry != null) _realtimeService.subscribeQueue(entry.queueId);
    return entry;
  }

  Future<ActiveQueueEntry> joinQueue(String queueId) async {
    state = const AsyncLoading();
    final result = await AsyncValue.guard(() => _repository.joinQueue(queueId));
    state = result;
    final entry = result.valueOrNull;
    if (entry != null) _realtimeService.subscribeQueue(entry.queueId);
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

  Future<ActiveQueueEntry> checkIn(String qrCodeToken) async {
    final entry = state.valueOrNull;
    if (entry == null) throw StateError('No active queue entry to check in');
    state = const AsyncLoading();
    final result = await AsyncValue.guard(() => _repository.checkInQueueEntry(entry.id, qrCodeToken));
    state = result;
    final updatedEntry = result.valueOrNull;
    if (updatedEntry != null) _realtimeService.subscribeQueue(updatedEntry.queueId);
    return result.requireValue;
  }

  void _handleRealtimeEvent(QueueRealtimeEvent event) {
    final entry = state.valueOrNull;
    if (entry != null && event.queueId != entry.queueId) return;
    unawaited(_refreshFromRealtime());
  }

  Future<void> _refreshFromRealtime() async {
    state = await AsyncValue.guard(_repository.getMyActiveQueue);
    final entry = state.valueOrNull;
    if (entry != null) _realtimeService.subscribeQueue(entry.queueId);
  }
}
