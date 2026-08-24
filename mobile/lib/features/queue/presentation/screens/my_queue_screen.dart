import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../shared/widgets/state_views.dart';
import '../controllers/active_queue_controller.dart';
import '../widgets/queue_stat_tile.dart';

class MyQueueScreen extends ConsumerWidget {
  const MyQueueScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queueState = ref.watch(activeQueueControllerProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Queue'),
        actions: [IconButton(tooltip: 'Refresh queue', onPressed: () => ref.read(activeQueueControllerProvider.notifier).refreshStatus(), icon: const Icon(Icons.refresh))],
      ),
      body: SafeArea(
        child: queueState.when(
          data: (entry) {
            if (entry == null) {
              return const EmptyStateView(title: 'No active queue', message: 'Join a business queue from Explore to track your turn.', icon: Icons.confirmation_number_outlined);
            }

            return RefreshIndicator(
              onRefresh: () => ref.read(activeQueueControllerProvider.notifier).refreshStatus(),
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  if (entry.business != null) ...[
                    Text(entry.business!.name, style: Theme.of(context).textTheme.titleLarge),
                    const SizedBox(height: 4),
                    Text(entry.business!.address),
                    const SizedBox(height: 16),
                  ],
                  Card(
                    color: Theme.of(context).colorScheme.primaryContainer,
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(children: [
                        Text('YOUR NUMBER', style: Theme.of(context).textTheme.labelLarge),
                        const SizedBox(height: 8),
                        FittedBox(child: Text(entry.queueNumber, style: Theme.of(context).textTheme.displayLarge?.copyWith(fontWeight: FontWeight.w800))),
                        const SizedBox(height: 8),
                        Chip(label: Text(entry.status.replaceAll('_', ' '))),
                      ]),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(children: [
                    Expanded(child: QueueStatTile(label: 'Now Serving', value: entry.nowServing ?? '-', icon: Icons.storefront_outlined)),
                    const SizedBox(width: 8),
                    Expanded(child: QueueStatTile(label: 'People Ahead', value: '${entry.peopleAhead}', icon: Icons.groups_outlined)),
                  ]),
                  const SizedBox(height: 8),
                  QueueStatTile(label: 'Estimated Time', value: '${entry.estimatedWaitingTimeMinutes} min', icon: Icons.schedule),
                  const SizedBox(height: 24),
                  FilledButton.icon(onPressed: null, icon: const Icon(Icons.qr_code_scanner), label: const Text('Check-in')),
                  const SizedBox(height: 8),
                  OutlinedButton.icon(
                    onPressed: () => _confirmCancel(context, ref),
                    icon: const Icon(Icons.close),
                    label: const Text('Cancel Queue'),
                  ),
                  const SizedBox(height: 8),
                  const Text('QR check-in is implemented in Phase 7.'),
                ],
              ),
            );
          },
          loading: () => const LoadingStateView(),
          error: (_, _) => ErrorStateView(message: 'Unable to load your queue.', onRetry: () => ref.invalidate(activeQueueControllerProvider)),
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
          TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Keep Queue')),
          FilledButton(onPressed: () => Navigator.of(context).pop(true), child: const Text('Cancel Queue')),
        ],
      ),
    );

    if (confirmed == true) {
      await ref.read(activeQueueControllerProvider.notifier).cancelQueue();
    }
  }
}