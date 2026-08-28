import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
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
      appBar: AppBar(title: const Text('Join queue')),
      body: business.when(
        data: (item) {
          final queue = item.queue;
          return SafeArea(
            child: Column(
              children: [
                Expanded(
                  child: ListView(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    children: [
                      const AppPageHeader(
                        eyebrow: 'FINAL STEP',
                        title: 'Confirm your place',
                        subtitle:
                            'Review the live estimate before joining this queue.',
                      ),
                      const SizedBox(height: AppSpacing.xl),
                      Text(
                        item.name,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(
                        item.address,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppColors.neutral,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.md),
                      Container(
                        padding: const EdgeInsets.all(AppSpacing.lg),
                        decoration: BoxDecoration(
                          color: AppColors.ink,
                          borderRadius: BorderRadius.circular(AppRadii.hero),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'ESTIMATED WAIT',
                              style: Theme.of(context).textTheme.labelMedium
                                  ?.copyWith(color: AppColors.paper3),
                            ),
                            const SizedBox(height: AppSpacing.xs),
                            Text(
                              '${queue.estimatedWaitingTimeMinutes} min',
                              style: Theme.of(context).textTheme.displaySmall
                                  ?.copyWith(color: AppColors.paper),
                            ),
                            const SizedBox(height: AppSpacing.md),
                            const Divider(color: AppColors.neutral),
                            const SizedBox(height: AppSpacing.sm),
                            Row(
                              children: [
                                const Icon(
                                  Icons.groups_outlined,
                                  size: 20,
                                  color: AppColors.accentSoft,
                                ),
                                const SizedBox(width: AppSpacing.xs),
                                Text(
                                  '${queue.peopleWaiting} people waiting now',
                                  style: Theme.of(context).textTheme.bodyMedium
                                      ?.copyWith(color: AppColors.paper3),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: AppSpacing.md),
                      Text(
                        'Queue estimates can change as people are served or cancel.',
                        style: Theme.of(
                          context,
                        ).textTheme.bodySmall?.copyWith(color: AppColors.muted),
                      ),
                      if (queueState.hasError) ...[
                        const SizedBox(height: AppSpacing.md),
                        _InlineJoinError(
                          message: _friendlyError(queueState.error),
                        ),
                      ],
                    ],
                  ),
                ),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.fromLTRB(
                    AppSpacing.lg,
                    AppSpacing.sm,
                    AppSpacing.lg,
                    AppSpacing.md,
                  ),
                  decoration: const BoxDecoration(
                    color: AppColors.paper,
                    border: Border(top: BorderSide(color: AppColors.rule)),
                  ),
                  child: FilledButton.icon(
                    onPressed: isJoining || queue.id == null
                        ? null
                        : () => _join(context, ref, queue.id!),
                    icon: isJoining
                        ? const SizedBox.square(
                            dimension: 18,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : const Icon(Icons.add_rounded),
                    label: Text(isJoining ? 'Joining…' : 'Join this queue'),
                  ),
                ),
              ],
            ),
          );
        },
        loading: () => const LoadingStateView(),
        error: (_, _) => ErrorStateView(
          message: 'Unable to load queue confirmation.',
          onRetry: () => ref.invalidate(businessDetailProvider(businessId)),
        ),
      ),
    );
  }

  Future<void> _join(
    BuildContext context,
    WidgetRef ref,
    String queueId,
  ) async {
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
      if (data is Map && data['message'] is String) {
        return data['message'] as String;
      }
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
    return Container(
      padding: const EdgeInsets.all(AppSpacing.sm),
      decoration: BoxDecoration(
        color: AppColors.errorContainer,
        border: Border.all(color: AppColors.error),
        borderRadius: BorderRadius.circular(AppRadii.input),
      ),
      child: Row(
        children: [
          const Icon(Icons.error_outline, color: AppColors.error),
          const SizedBox(width: AppSpacing.xs),
          Expanded(
            child: Text(message, style: const TextStyle(color: AppColors.ink)),
          ),
        ],
      ),
    );
  }
}
