import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/merchant_queue_repository_impl.dart';
import '../../domain/entities/merchant_queue_dashboard.dart';
import '../../domain/repositories/merchant_queue_repository.dart';

final merchantDashboardControllerProvider = AsyncNotifierProvider<MerchantDashboardController, MerchantDashboardState>(MerchantDashboardController.new);

class MerchantDashboardState {
  const MerchantDashboardState({required this.queues, this.selectedQueueId, this.dashboard, this.actionInProgress = false});

  final List<MerchantQueueOverview> queues;
  final String? selectedQueueId;
  final MerchantQueueDashboard? dashboard;
  final bool actionInProgress;

  MerchantDashboardState copyWith({
    List<MerchantQueueOverview>? queues,
    String? selectedQueueId,
    MerchantQueueDashboard? dashboard,
    bool? actionInProgress,
  }) {
    return MerchantDashboardState(
      queues: queues ?? this.queues,
      selectedQueueId: selectedQueueId ?? this.selectedQueueId,
      dashboard: dashboard ?? this.dashboard,
      actionInProgress: actionInProgress ?? this.actionInProgress,
    );
  }
}

class MerchantDashboardController extends AsyncNotifier<MerchantDashboardState> {
  late final MerchantQueueRepository _repository;

  @override
  Future<MerchantDashboardState> build() async {
    _repository = ref.watch(merchantQueueRepositoryProvider);
    final queues = await _repository.getActiveQueues();
    if (queues.isEmpty) return const MerchantDashboardState(queues: []);

    final selectedQueueId = queues.first.queue.id;
    final dashboard = await _repository.getDashboard(selectedQueueId);
    return MerchantDashboardState(queues: queues, selectedQueueId: selectedQueueId, dashboard: dashboard);
  }

  Future<void> refresh() async {
    final current = state.valueOrNull;
    if (current?.selectedQueueId == null) {
      ref.invalidateSelf();
      return;
    }

    state = const AsyncLoading<MerchantDashboardState>().copyWithPrevious(state);
    state = await AsyncValue.guard(() async {
      final queues = await _repository.getActiveQueues();
      if (queues.isEmpty) return const MerchantDashboardState(queues: []);
      final selectedQueueId = current!.selectedQueueId!;
      final queueStillExists = queues.any((queue) => queue.queue.id == selectedQueueId);
      final nextQueueId = queueStillExists ? selectedQueueId : queues.first.queue.id;
      final dashboard = await _repository.getDashboard(nextQueueId);
      return MerchantDashboardState(queues: queues, selectedQueueId: nextQueueId, dashboard: dashboard);
    });
  }

  Future<void> selectQueue(String queueId) async {
    final current = state.valueOrNull;
    if (current == null || queueId == current.selectedQueueId) return;

    state = const AsyncLoading<MerchantDashboardState>().copyWithPrevious(state);
    state = await AsyncValue.guard(() async {
      final dashboard = await _repository.getDashboard(queueId);
      return current.copyWith(selectedQueueId: queueId, dashboard: dashboard, actionInProgress: false);
    });
  }

  Future<void> runQueueAction(Future<void> Function(MerchantQueueRepository repository) action) async {
    final current = state.valueOrNull;
    if (current == null || current.selectedQueueId == null) return;

    state = AsyncData(current.copyWith(actionInProgress: true));
    state = await AsyncValue.guard(() async {
      await action(_repository);
      final dashboard = await _repository.getDashboard(current.selectedQueueId!);
      return current.copyWith(dashboard: dashboard, actionInProgress: false);
    });
  }
}