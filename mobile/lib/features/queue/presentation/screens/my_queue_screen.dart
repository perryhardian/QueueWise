import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../../shared/widgets/state_views.dart';
import '../controllers/active_queue_controller.dart';
import '../widgets/queue_stat_tile.dart';

class MyQueueScreen extends ConsumerWidget {
  const MyQueueScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queueState = ref.watch(activeQueueControllerProvider);

    return Scaffold(
      body: SafeArea(
        child: queueState.when(
          data: (entry) {
            if (entry == null) {
              return EmptyStateView(
                title: 'No active queue',
                message:
                    'Join a business queue from Explore to track your turn.',
                icon: Icons.confirmation_number_outlined,
                actionLabel: 'Explore queues',
                onAction: () => context.go('/explore'),
              );
            }
            final canCancel =
                entry.status == 'WAITING' || entry.status == 'CHECKED_IN';

            return RefreshIndicator(
              onRefresh: () => ref
                  .read(activeQueueControllerProvider.notifier)
                  .refreshStatus(),
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.lg),
                children: [
                  AppPageHeader(
                    eyebrow: 'LIVE POSITION',
                    title: 'My queue',
                    subtitle: 'Your place updates automatically.',
                    trailing: IconButton.filledTonal(
                      tooltip: 'Refresh queue',
                      onPressed: () => ref
                          .read(activeQueueControllerProvider.notifier)
                          .refreshStatus(),
                      icon: const Icon(Icons.refresh_rounded),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  if (entry.business != null) ...[
                    Text(
                      entry.business!.name,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(
                      entry.business!.address,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppColors.neutral,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                  ],
                  Container(
                    decoration: BoxDecoration(
                      color: AppColors.ink,
                      borderRadius: BorderRadius.circular(AppRadii.hero),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'YOUR NUMBER',
                            style: Theme.of(context).textTheme.labelMedium
                                ?.copyWith(color: AppColors.paper3),
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          FittedBox(
                            child: Text(
                              entry.queueNumber,
                              style: Theme.of(context).textTheme.displayLarge
                                  ?.copyWith(color: AppColors.paper),
                            ),
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.sm,
                              vertical: AppSpacing.xs,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.accentSoft,
                              borderRadius: BorderRadius.circular(
                                AppRadii.pill,
                              ),
                            ),
                            child: Text(
                              entry.status.replaceAll('_', ' '),
                              style: Theme.of(context).textTheme.labelMedium
                                  ?.copyWith(color: AppColors.ink),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Row(
                    children: [
                      Expanded(
                        child: QueueStatTile(
                          label: 'Now Serving',
                          value: entry.nowServing ?? '-',
                          icon: Icons.storefront_outlined,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: QueueStatTile(
                          label: 'People Ahead',
                          value: '${entry.peopleAhead}',
                          icon: Icons.groups_outlined,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  QueueStatTile(
                    label: 'Estimated Time',
                    value: '${entry.estimatedWaitingTimeMinutes} min',
                    icon: Icons.schedule,
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  FilledButton.icon(
                    onPressed: entry.status == 'WAITING'
                        ? () => context.go('/my-queue/check-in')
                        : null,
                    icon: const Icon(Icons.qr_code_scanner),
                    label: Text(
                      entry.status == 'CHECKED_IN' ? 'Checked in' : 'Check in',
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  OutlinedButton.icon(
                    onPressed: canCancel
                        ? () => _confirmCancel(context, ref)
                        : null,
                    icon: const Icon(Icons.close),
                    label: const Text('Cancel queue'),
                  ),
                  if (!canCancel) ...[
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'This queue can no longer be cancelled from the app.',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                  if (entry.status == 'CHECKED_IN') ...[
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      'You are checked in. Stay nearby for your turn.',
                      style: const TextStyle(
                        color: AppColors.accent,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ],
              ),
            );
          },
          loading: () => const LoadingStateView(),
          error: (_, _) => ErrorStateView(
            message: 'Unable to load your queue.',
            onRetry: () => ref.invalidate(activeQueueControllerProvider),
          ),
        ),
      ),
    );
  }

  Future<void> _confirmCancel(BuildContext context, WidgetRef ref) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel queue?'),
        content: const Text('You will lose your current queue position.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Keep my place'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Cancel queue'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await ref.read(activeQueueControllerProvider.notifier).cancelQueue();
    }
  }
}
