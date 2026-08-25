import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../shared/widgets/state_views.dart';
import '../../domain/entities/queue_history_item.dart';
import '../controllers/queue_history_controller.dart';

class HistoryScreen extends ConsumerWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historyState = ref.watch(queueHistoryControllerProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('History'),
        actions: [
          IconButton(
            tooltip: 'Refresh history',
            onPressed: () => ref.invalidate(queueHistoryControllerProvider),
            icon: const Icon(Icons.refresh),
          ),
        ],
      ),
      body: SafeArea(
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
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                itemCount: items.length,
                separatorBuilder: (_, _) => const SizedBox(height: 8),
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
    );
  }
}

class _HistoryCard extends StatelessWidget {
  const _HistoryCard({required this.item});

  final QueueHistoryItem item;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final dateText = DateFormat(
      'EEE, d MMM yyyy',
    ).format(item.completedAt ?? item.joinedAt);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
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
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: colors.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                _StatusChip(status: item.finalStatus),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(
                  Icons.confirmation_number_outlined,
                  size: 20,
                  color: colors.primary,
                ),
                const SizedBox(width: 8),
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
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: colors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _Metric(
                    label: 'Wait',
                    value: _minutes(item.waitingMinutes),
                  ),
                ),
                const SizedBox(width: 8),
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
    final colors = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: colors.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(
              context,
            ).textTheme.labelSmall?.copyWith(color: colors.onSurfaceVariant),
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
    final colors = Theme.of(context).colorScheme;
    final config = switch (status) {
      'COMPLETED' => (
        label: 'Completed',
        icon: Icons.task_alt,
        color: colors.primary,
      ),
      'CANCELLED' => (
        label: 'Cancelled',
        icon: Icons.cancel_outlined,
        color: colors.error,
      ),
      'NO_SHOW' => (
        label: 'No-show',
        icon: Icons.person_off_outlined,
        color: colors.tertiary,
      ),
      _ => (
        label: status,
        icon: Icons.info_outline,
        color: colors.onSurfaceVariant,
      ),
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
