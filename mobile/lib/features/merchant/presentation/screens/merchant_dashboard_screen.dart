import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../../shared/widgets/state_views.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../../queue/presentation/widgets/queue_stat_tile.dart';
import '../../domain/entities/merchant_queue_dashboard.dart';
import '../controllers/merchant_dashboard_controller.dart';
import '../widgets/merchant_queue_entry_card.dart';
import '../widgets/merchant_status_chip.dart';

class MerchantDashboardScreen extends ConsumerWidget {
  const MerchantDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashboardState = ref.watch(merchantDashboardControllerProvider);
    final user = ref.watch(authControllerProvider).valueOrNull;

    return Scaffold(
      body: SafeArea(
        child: dashboardState.when(
          data: (state) {
            if (state.queues.isEmpty || state.dashboard == null) {
              return EmptyStateView(
                title: 'No active queue',
                message:
                    'Open a queue from your business tools to start serving customers.',
                icon: Icons.store_mall_directory_outlined,
              );
            }

            return RefreshIndicator(
              onRefresh: () => ref
                  .read(merchantDashboardControllerProvider.notifier)
                  .refresh(),
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.lg),
                children: [
                  AppPageHeader(
                    eyebrow: 'LIVE OPERATIONS',
                    title: 'Serve the queue',
                    subtitle: 'Hi, ${user?.fullName ?? 'Merchant'}',
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton.filledTonal(
                          tooltip: 'Refresh dashboard',
                          onPressed: () => ref
                              .read(
                                merchantDashboardControllerProvider.notifier,
                              )
                              .refresh(),
                          icon: const Icon(Icons.refresh_rounded),
                        ),
                        IconButton(
                          tooltip: 'Log out',
                          onPressed: () => ref
                              .read(authControllerProvider.notifier)
                              .logout(),
                          icon: const Icon(Icons.logout_rounded),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  if (state.queues.length > 1) ...[
                    _QueueSelector(state: state),
                    const SizedBox(height: AppSpacing.sm),
                  ],
                  _DashboardHeader(
                    dashboard: state.dashboard!,
                    actionInProgress: state.actionInProgress,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  _StatsGrid(dashboard: state.dashboard!),
                  if (state.analytics != null) ...[
                    const SizedBox(height: AppSpacing.md),
                    _AnalyticsSummary(analytics: state.analytics!),
                  ],
                  const SizedBox(height: AppSpacing.md),
                  FilledButton.icon(
                    onPressed: state.actionInProgress
                        ? null
                        : () => ref
                              .read(
                                merchantDashboardControllerProvider.notifier,
                              )
                              .runQueueAction(
                                (repository) => repository.callNext(
                                  state.dashboard!.queue.id,
                                ),
                              ),
                    icon: state.actionInProgress
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : const Icon(Icons.campaign_outlined),
                    label: const Text('Call next customer'),
                  ),
                  const SizedBox(height: AppSpacing.section),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Queue list',
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ),
                      Text(
                        '${state.dashboard!.entries.length} entries',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  if (state.dashboard!.entries.isEmpty)
                    const Padding(
                      padding: EdgeInsets.only(top: AppSpacing.md),
                      child: EmptyStateView(
                        title: 'Queue is empty',
                        message:
                            'New online and walk-in customers will appear here.',
                        icon: Icons.people_outline,
                      ),
                    )
                  else
                    ...state.dashboard!.entries.map(
                      (entry) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: MerchantQueueEntryCard(
                          entry: entry,
                          actionInProgress: state.actionInProgress,
                          onCall: (entry) => _runAction(
                            ref,
                            (repository) => repository.callEntry(entry.id),
                          ),
                          onStart: (entry) => _runAction(
                            ref,
                            (repository) => repository.startService(entry.id),
                          ),
                          onComplete: (entry) => _runAction(
                            ref,
                            (repository) =>
                                repository.completeService(entry.id),
                          ),
                          onNoShow: (entry) =>
                              _confirmNoShow(context, ref, entry),
                          onSkip: (entry) => _confirmSkip(context, ref, entry),
                        ),
                      ),
                    ),
                ],
              ),
            );
          },
          loading: () => dashboardState.valueOrNull == null
              ? const LoadingStateView()
              : _LoadingWithContent(state: dashboardState.valueOrNull!),
          error: (_, _) => ErrorStateView(
            message: 'Unable to load merchant dashboard.',
            onRetry: () => ref.invalidate(merchantDashboardControllerProvider),
          ),
        ),
      ),
    );
  }

  Future<void> _runAction(
    WidgetRef ref,
    Future<void> Function(dynamic repository) action,
  ) {
    return ref
        .read(merchantDashboardControllerProvider.notifier)
        .runQueueAction(action);
  }

  Future<void> _confirmNoShow(
    BuildContext context,
    WidgetRef ref,
    MerchantQueueEntry entry,
  ) async {
    final confirmed = await _confirmAction(
      context,
      title: 'Mark no-show?',
      message: '${entry.queueNumber} will be removed from the active queue.',
    );
    if (confirmed == true) {
      await _runAction(ref, (repository) => repository.markNoShow(entry.id));
    }
  }

  Future<void> _confirmSkip(
    BuildContext context,
    WidgetRef ref,
    MerchantQueueEntry entry,
  ) async {
    final confirmed = await _confirmAction(
      context,
      title: 'Skip customer?',
      message:
          '${entry.queueNumber} will be marked no-show and removed from active service.',
    );
    if (confirmed == true) {
      await _runAction(ref, (repository) => repository.skipEntry(entry.id));
    }
  }

  Future<bool?> _confirmAction(
    BuildContext context, {
    required String title,
    required String message,
  }) {
    return showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Continue'),
          ),
        ],
      ),
    );
  }
}

class _LoadingWithContent extends StatelessWidget {
  const _LoadingWithContent({required this.state});

  final MerchantDashboardState state;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (state.dashboard == null)
          const LoadingStateView()
        else
          const SizedBox.shrink(),
        const Positioned(
          left: 0,
          right: 0,
          top: 0,
          child: LinearProgressIndicator(),
        ),
      ],
    );
  }
}

class _QueueSelector extends ConsumerWidget {
  const _QueueSelector({required this.state});

  final MerchantDashboardState state;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DropdownButtonFormField<String>(
      initialValue: state.selectedQueueId,
      decoration: const InputDecoration(labelText: 'Active queue'),
      items: state.queues
          .map(
            (queue) => DropdownMenuItem(
              value: queue.queue.id,
              child: Text(queue.business.name),
            ),
          )
          .toList(),
      onChanged: state.actionInProgress
          ? null
          : (value) {
              if (value != null) {
                ref
                    .read(merchantDashboardControllerProvider.notifier)
                    .selectQueue(value);
              }
            },
    );
  }
}

class _DashboardHeader extends StatelessWidget {
  const _DashboardHeader({
    required this.dashboard,
    required this.actionInProgress,
  });

  final MerchantQueueDashboard dashboard;
  final bool actionInProgress;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.ink,
        borderRadius: BorderRadius.circular(AppRadii.hero),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    dashboard.business.name,
                    style: Theme.of(
                      context,
                    ).textTheme.titleLarge?.copyWith(color: AppColors.paper),
                  ),
                ),
                MerchantStatusChip(status: dashboard.queue.status),
              ],
            ),
            const SizedBox(height: AppSpacing.xxs),
            Text(
              dashboard.business.address,
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: AppColors.paper3),
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              'NOW SERVING',
              style: Theme.of(
                context,
              ).textTheme.labelLarge?.copyWith(color: AppColors.paper3),
            ),
            const SizedBox(height: AppSpacing.xxs),
            FittedBox(
              child: Text(
                dashboard.nowServing ?? '-',
                style: Theme.of(
                  context,
                ).textTheme.displayMedium?.copyWith(color: AppColors.paper),
              ),
            ),
            if (actionInProgress) ...[
              const SizedBox(height: AppSpacing.sm),
              const LinearProgressIndicator(color: AppColors.accentSoft),
            ],
          ],
        ),
      ),
    );
  }
}

class _StatsGrid extends StatelessWidget {
  const _StatsGrid({required this.dashboard});

  final MerchantQueueDashboard dashboard;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: QueueStatTile(
                label: 'Waiting',
                value: '${dashboard.waitingCount}',
                icon: Icons.groups_outlined,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: QueueStatTile(
                label: 'Checked-in',
                value: '${dashboard.checkedInCount}',
                icon: Icons.fact_check_outlined,
              ),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.sm),
        Row(
          children: [
            Expanded(
              child: QueueStatTile(
                label: 'Completed',
                value: '${dashboard.completedCount}',
                icon: Icons.task_alt,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: QueueStatTile(
                label: 'Avg Service',
                value: '${dashboard.averageServiceTimeMinutes} min',
                icon: Icons.timer_outlined,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _AnalyticsSummary extends StatelessWidget {
  const _AnalyticsSummary({required this.analytics});

  final MerchantAnalytics analytics;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final maxTotal = analytics.recentDays.fold<int>(
      1,
      (max, day) => day.total > max ? day.total : max,
    );

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.analytics_outlined, color: colors.primary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Last 7 Days',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _AnalyticsMetric(
                    label: 'Served',
                    value: '${analytics.completedCount}',
                    icon: Icons.task_alt,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _AnalyticsMetric(
                    label: 'No-show',
                    value: '${analytics.noShowCount}',
                    icon: Icons.person_off_outlined,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: _AnalyticsMetric(
                    label: 'Avg Wait',
                    value: '${analytics.averageWaitingMinutes} min',
                    icon: Icons.hourglass_empty_outlined,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _AnalyticsMetric(
                    label: 'Avg Service',
                    value: '${analytics.averageServiceMinutes} min',
                    icon: Icons.timer_outlined,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: analytics.recentDays
                  .map(
                    (day) => Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 2),
                        child: _DayBar(day: day, maxTotal: maxTotal),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}

class _AnalyticsMetric extends StatelessWidget {
  const _AnalyticsMetric({
    required this.label,
    required this.value,
    required this.icon,
  });

  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: colors.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Icon(icon, size: 20, color: colors.primary),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: colors.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  value,
                  style: Theme.of(
                    context,
                  ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DayBar extends StatelessWidget {
  const _DayBar({required this.day, required this.maxTotal});

  final MerchantAnalyticsDay day;
  final int maxTotal;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final total = day.total;
    final height = 16 + (56 * (total / maxTotal));
    final label = DateFormat('E').format(day.date);

    return Semantics(
      label: '$label analytics, $total total visits',
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            height: height,
            width: 18,
            decoration: BoxDecoration(
              color: total == 0 ? colors.outlineVariant : colors.primary,
              borderRadius: BorderRadius.circular(6),
            ),
          ),
          const SizedBox(height: 6),
          Text(
            label,
            style: Theme.of(
              context,
            ).textTheme.labelSmall?.copyWith(color: colors.onSurfaceVariant),
          ),
        ],
      ),
    );
  }
}
