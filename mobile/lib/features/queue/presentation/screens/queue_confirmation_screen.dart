import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../shared/widgets/state_views.dart';
import '../../../business/presentation/controllers/business_providers.dart';
import '../controllers/active_queue_controller.dart';

class QueueConfirmationScreen extends ConsumerWidget {
  const QueueConfirmationScreen({required this.businessId, super.key});
  final String businessId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final business = ref.watch(businessDetailProvider(businessId));
    final queueState = ref.watch(activeQueueControllerProvider);
    final isJoining = queueState.isLoading;

    return Scaffold(
      appBar: AppBar(title: const Text('Confirm Queue')),
      body: business.when(
        data: (item) {
          final queue = item.queue;
          return SafeArea(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(item.name, style: Theme.of(context).textTheme.headlineSmall),
                const SizedBox(height: 8),
                Text(item.address),
                const SizedBox(height: 24),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text('${queue.peopleWaiting} people currently waiting', style: Theme.of(context).textTheme.titleMedium),
                      const SizedBox(height: 16),
                      Text('Estimated waiting time', style: Theme.of(context).textTheme.bodyMedium),
                      const SizedBox(height: 4),
                      Text('${queue.estimatedWaitingTimeMinutes} minutes', style: Theme.of(context).textTheme.displaySmall?.copyWith(fontWeight: FontWeight.w700)),
                    ]),
                  ),
                ),
                const SizedBox(height: 24),
                if (queueState.hasError) ...[
                  _InlineJoinError(message: _friendlyError(queueState.error)),
                  const SizedBox(height: 16),
                ],
                FilledButton.icon(
                  onPressed: isJoining || queue.id == null ? null : () => _join(context, ref, queue.id!),
                  icon: isJoining ? const SizedBox.square(dimension: 18, child: CircularProgressIndicator(strokeWidth: 2)) : const Icon(Icons.add),
                  label: const Text('Join Queue'),
                ),
              ],
            ),
          );
        },
        loading: () => const LoadingStateView(),
        error: (_, _) => ErrorStateView(message: 'Unable to load queue confirmation.', onRetry: () => ref.invalidate(businessDetailProvider(businessId))),
      ),
    );
  }

  Future<void> _join(BuildContext context, WidgetRef ref, String queueId) async {
    try {
      await ref.read(activeQueueControllerProvider.notifier).joinQueue(queueId);
      if (context.mounted) context.go('/my-queue');
    } on DioException {
      // Error state is rendered from the controller.
    }
  }

  String _friendlyError(Object? error) {
    if (error is DioException) {
      final data = error.response?.data;
      if (data is Map && data['message'] is String) return data['message'] as String;
      return 'Unable to join the queue. Check your connection and try again.';
    }
    return 'Unable to join the queue. Please try again.';
  }
}

class _InlineJoinError extends StatelessWidget {
  const _InlineJoinError({required this.message});
  final String message;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: colors.errorContainer, borderRadius: BorderRadius.circular(8)),
      child: Row(children: [Icon(Icons.error_outline, color: colors.onErrorContainer), const SizedBox(width: 8), Expanded(child: Text(message, style: TextStyle(color: colors.onErrorContainer)))]),
    );
  }
}