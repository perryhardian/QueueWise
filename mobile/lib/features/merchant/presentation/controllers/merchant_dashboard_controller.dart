import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/realtime/queue_realtime_service.dart';
import '../../data/repositories/merchant_queue_repository_impl.dart';
import '../../domain/entities/merchant_queue_dashboard.dart';
import '../../domain/repositories/merchant_queue_repository.dart';

final merchantDashboardControllerProvider =
    AsyncNotifierProvider<MerchantDashboardController, MerchantDashboardState>(
      MerchantDashboardController.new,
    );

class MerchantDashboardState {
  const MerchantDashboardState({
    required this.queues,
    this.selectedQueueId,
    this.dashboard,
    this.analytics,
    this.actionInProgress = false,
  });

  final List<MerchantQueueOverview> queues;
  final String? selectedQueueId;
  final MerchantQueueDashboard? dashboard;
  final MerchantAnalytics? analytics;
  final bool actionInProgress;

  MerchantDashboardState copyWith({
    List<MerchantQueueOverview>? queues,
    String? selectedQueueId,
    MerchantQueueDashboard? dashboard,
    MerchantAnalytics? analytics,
    bool? actionInProgress,
  }) {
    return MerchantDashboardState(
      queues: queues ?? this.queues,
      selectedQueueId: selectedQueueId ?? this.selectedQueueId,
      dashboard: dashboard ?? this.dashboard,
      analytics: analytics ?? this.analytics,
      actionInProgress: actionInProgress ?? this.actionInProgress,
    );
  }
}

class MerchantDashboardController
    extends AsyncNotifier<MerchantDashboardState> {
  late final MerchantQueueRepository _repository;
  late final QueueRealtimeService _realtimeService;
  StreamSubscription<QueueRealtimeEvent>? _realtimeSubscription;

  @override
  Future<MerchantDashboardState> build() async {
    _repository = ref.watch(merchantQueueRepositoryProvider);
    _realtimeService = ref.watch(queueRealtimeServiceProvider);
    _realtimeSubscription?.cancel();
    _realtimeSubscription = _realtimeService.events.listen(
      _handleRealtimeEvent,
    );
    ref.onDispose(() => _realtimeSubscription?.cancel());

    await _realtimeService.connect();
    final queues = await _repository.getActiveQueues();
    if (queues.isEmpty) return const MerchantDashboardState(queues: []);

    final selectedQueueId = queues.first.queue.id;
    _realtimeService.subscribeQueue(selectedQueueId);
    _realtimeService.subscribeBusiness(queues.first.business.id);
    final dashboard = await _repository.getDashboard(selectedQueueId);
    final analytics = await _repository.getAnalytics(queues.first.business.id);
    return MerchantDashboardState(
      queues: queues,
      selectedQueueId: selectedQueueId,
      dashboard: dashboard,
      analytics: analytics,
    );
  }

  Future<void> refresh() async {
    final current = state.valueOrNull;
    if (current?.selectedQueueId == null) {
      ref.invalidateSelf();
      return;
    }

    state = const AsyncLoading<MerchantDashboardState>().copyWithPrevious(
      state,
    );
    state = await AsyncValue.guard(() async {
      final queues = await _repository.getActiveQueues();
      if (queues.isEmpty) return const MerchantDashboardState(queues: []);
      final selectedQueueId = current!.selectedQueueId!;
      final queueStillExists = queues.any(
        (queue) => queue.queue.id == selectedQueueId,
      );
      final nextQueueId = queueStillExists
          ? selectedQueueId
          : queues.first.queue.id;
      final dashboard = await _repository.getDashboard(nextQueueId);
      final analytics = await _repository.getAnalytics(
        _businessIdForQueue(queues, nextQueueId),
      );
      return MerchantDashboardState(
        queues: queues,
        selectedQueueId: nextQueueId,
        dashboard: dashboard,
        analytics: analytics,
      );
    });
  }

  Future<void> selectQueue(String queueId) async {
    final current = state.valueOrNull;
    if (current == null || queueId == current.selectedQueueId) return;

    state = const AsyncLoading<MerchantDashboardState>().copyWithPrevious(
      state,
    );
    state = await AsyncValue.guard(() async {
      final dashboard = await _repository.getDashboard(queueId);
      final analytics = await _repository.getAnalytics(
        _businessIdForQueue(current.queues, queueId),
      );
      _realtimeService.subscribeQueue(queueId);
      return current.copyWith(
        selectedQueueId: queueId,
        dashboard: dashboard,
        analytics: analytics,
        actionInProgress: false,
      );
    });
  }

  Future<void> runQueueAction(
    Future<void> Function(MerchantQueueRepository repository) action,
  ) async {
    final current = state.valueOrNull;
    if (current == null || current.selectedQueueId == null) return;

    state = AsyncData(current.copyWith(actionInProgress: true));
    state = await AsyncValue.guard(() async {
      await action(_repository);
      final dashboard = await _repository.getDashboard(
        current.selectedQueueId!,
      );
      final analytics = await _repository.getAnalytics(
        _businessIdForQueue(current.queues, current.selectedQueueId!),
      );
      return current.copyWith(
        dashboard: dashboard,
        analytics: analytics,
        actionInProgress: false,
      );
    });
  }

  void _handleRealtimeEvent(QueueRealtimeEvent event) {
    final current = state.valueOrNull;
    if (current?.selectedQueueId == null ||
        event.queueId != current!.selectedQueueId) {
      return;
    }
    if (current.actionInProgress) {
      return;
    }
    unawaited(_refreshFromRealtime());
  }

  Future<void> _refreshFromRealtime() async {
    final current = state.valueOrNull;
    if (current?.selectedQueueId == null) {
      return;
    }

    state = await AsyncValue.guard(() async {
      final queues = await _repository.getActiveQueues();
      if (queues.isEmpty) return const MerchantDashboardState(queues: []);
      final selectedQueueId = current!.selectedQueueId!;
      final queueStillExists = queues.any(
        (queue) => queue.queue.id == selectedQueueId,
      );
      final nextQueueId = queueStillExists
          ? selectedQueueId
          : queues.first.queue.id;
      final dashboard = await _repository.getDashboard(nextQueueId);
      final analytics = await _repository.getAnalytics(
        _businessIdForQueue(queues, nextQueueId),
      );
      _realtimeService.subscribeQueue(nextQueueId);
      return current.copyWith(
        queues: queues,
        selectedQueueId: nextQueueId,
        dashboard: dashboard,
        analytics: analytics,
        actionInProgress: false,
      );
    });
  }

  String _businessIdForQueue(
    List<MerchantQueueOverview> queues,
    String queueId,
  ) {
    return queues
        .firstWhere(
          (queue) => queue.queue.id == queueId,
          orElse: () => queues.first,
        )
        .business
        .id;
  }
}
