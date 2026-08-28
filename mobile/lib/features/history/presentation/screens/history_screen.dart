import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../../shared/widgets/state_views.dart';
import '../../domain/entities/queue_history_item.dart';
import '../controllers/queue_history_controller.dart';

class HistoryScreen extends ConsumerWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historyState = ref.watch(queueHistoryControllerProvider);

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.lg,
                AppSpacing.lg,
                AppSpacing.lg,
                AppSpacing.md,
              ),
              child: AppPageHeader(
                eyebrow: 'PAST VISITS',
                title: 'Queue history',
                subtitle: 'A record of your recent queue activity.',
                trailing: IconButton.filledTonal(
                  tooltip: 'Refresh history',
                  onPressed: () =>
                      ref.invalidate(queueHistoryControllerProvider),
                  icon: const Icon(Icons.refresh_rounded),
                ),
              ),
            ),
            Expanded(
              child: historyState.when(
                data: (items) {
                  if (items.isEmpty) {
                    return const EmptyStateView(
                      title: 'No queue history yet',
                      message:
                          'Completed, cancelled, and no-show visits will appear here.',
                      icon: Icons.history,
                    );
                  }

                  return RefreshIndicator(
                    onRefresh: () async =>
                        ref.invalidate(queueHistoryControllerProvider),
                    child: ListView.separated(
                      padding: const EdgeInsets.fromLTRB(
                        AppSpacing.lg,
                        0,
                        AppSpacing.lg,
                        AppSpacing.lg,
                      ),
                      itemCount: items.length,
                      separatorBuilder: (_, _) =>
                          const SizedBox(height: AppSpacing.sm),
                      itemBuilder: (context, index) =>
                          _HistoryCard(item: items[index]),
                    ),
                  );
                },
                loading: () => const LoadingStateView(),
                error: (_, _) => ErrorStateView(
                  message: 'Unable to load queue history.',
                  onRetry: () => ref.invalidate(queueHistoryControllerProvider),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HistoryCard extends StatelessWidget {
  const _HistoryCard({required this.item});

  final QueueHistoryItem item;

  @override
  Widget build(BuildContext context) {
    final dateText = DateFormat(
      'EEE, d MMM yyyy',
    ).format(item.completedAt ?? item.joinedAt);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.business.name,
                        style: Theme.of(context).textTheme.titleMedium
                            ?.copyWith(fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.business.categoryName,
                        style: Theme.of(
                          context,
                        ).textTheme.bodySmall?.copyWith(color: AppColors.muted),
                      ),
                    ],
                  ),
                ),
                _StatusChip(status: item.finalStatus),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Icon(
                  Icons.confirmation_number_outlined,
                  size: 20,
                  color: AppColors.accent,
                ),
                const SizedBox(width: AppSpacing.xs),
                Expanded(
                  child: Text(
                    'Queue ${item.queueNumber}',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                Text(
                  dateText,
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: AppColors.muted),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Expanded(
                  child: _Metric(
                    label: 'Wait',
                    value: _minutes(item.waitingMinutes),
                  ),
                ),
                const SizedBox(width: AppSpacing.xs),
                Expanded(
                  child: _Metric(
                    label: 'Service',
                    value: _minutes(item.serviceMinutes),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _minutes(int? value) => value == null ? '-' : '$value min';
}

class _Metric extends StatelessWidget {
  const _Metric({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: AppColors.paper2,
        borderRadius: BorderRadius.circular(AppRadii.input),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(
              context,
            ).textTheme.labelSmall?.copyWith(color: AppColors.muted),
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
    );
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    final config = switch (status) {
      'COMPLETED' => (
        label: 'Completed',
        icon: Icons.task_alt,
        color: AppColors.accent,
      ),
      'CANCELLED' => (
        label: 'Cancelled',
        icon: Icons.cancel_outlined,
        color: AppColors.error,
      ),
      'NO_SHOW' => (
        label: 'No-show',
        icon: Icons.person_off_outlined,
        color: AppColors.warning,
      ),
      _ => (label: status, icon: Icons.info_outline, color: AppColors.muted),
    };

    return Semantics(
      label: 'Queue status ${config.label}',
      child: Chip(
        avatar: Icon(config.icon, size: 16, color: config.color),
        label: Text(config.label),
        visualDensity: VisualDensity.compact,
      ),
    );
  }
}
