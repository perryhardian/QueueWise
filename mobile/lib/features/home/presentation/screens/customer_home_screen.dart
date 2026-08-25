import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../shared/widgets/state_views.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../../business/presentation/controllers/business_providers.dart';
import '../../../business/presentation/widgets/business_card.dart';
import '../../../queue/domain/entities/active_queue_entry.dart';
import '../../../queue/presentation/controllers/active_queue_controller.dart';

class CustomerHomeScreen extends ConsumerWidget {
  const CustomerHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).valueOrNull;
    final nearby = ref.watch(nearbyBusinessesProvider);
    final activeQueue = ref.watch(activeQueueControllerProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            ref.invalidate(nearbyBusinessesProvider);
            ref.invalidate(activeQueueControllerProvider);
          },
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text(
                'Hi, ${user?.fullName ?? 'Customer'}',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: 4),
              const Text('Find a queue before you leave.'),
              const SizedBox(height: 16),
              _HomeQueueCard(activeQueue: activeQueue),
              const SizedBox(height: 24),
              Text(
                'Nearby Businesses',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              nearby.when(
                data: (items) => items.isEmpty
                    ? const EmptyStateView(
                        title: 'No businesses yet',
                        message: 'Seed or create businesses to see them here.',
                      )
                    : Column(
                        children: items
                            .take(5)
                            .map(
                              (business) => BusinessCard(
                                business: business,
                                onTap: () =>
                                    context.go('/businesses/${business.id}'),
                              ),
                            )
                            .toList(),
                      ),
                loading: () =>
                    const SizedBox(height: 180, child: LoadingStateView()),
                error: (_, _) => ErrorStateView(
                  message: 'Unable to load nearby businesses.',
                  onRetry: () => ref.invalidate(nearbyBusinessesProvider),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HomeQueueCard extends StatelessWidget {
  const _HomeQueueCard({required this.activeQueue});

  final AsyncValue<ActiveQueueEntry?> activeQueue;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Card(
      color: colors.primaryContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: activeQueue.when(
          data: (entry) => entry == null
              ? const _NoActiveQueueContent()
              : _ActiveQueueContent(entry: entry),
          loading: () => const SizedBox(
            height: 112,
            child: Center(child: CircularProgressIndicator()),
          ),
          error: (_, _) => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const _QueueCardHeader(),
              const SizedBox(height: 8),
              Text(
                'Queue status unavailable',
                style: Theme.of(
                  context,
                ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 6),
              const Text('Refresh the page or open My Queue to retry.'),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: () => context.go('/my-queue'),
                icon: const Icon(Icons.confirmation_number_outlined),
                label: const Text('Open My Queue'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _QueueCardHeader extends StatelessWidget {
  const _QueueCardHeader();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Icon(Icons.confirmation_number_outlined),
        const SizedBox(width: 8),
        Text('Your Queue', style: Theme.of(context).textTheme.titleMedium),
      ],
    );
  }
}

class _NoActiveQueueContent extends StatelessWidget {
  const _NoActiveQueueContent();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _QueueCardHeader(),
        const SizedBox(height: 8),
        Text(
          'No active queue yet',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
        const SizedBox(height: 6),
        const Text('Explore nearby businesses and join a queue online.'),
        const SizedBox(height: 12),
        FilledButton.icon(
          onPressed: () => context.go('/explore'),
          icon: const Icon(Icons.search),
          label: const Text('Explore'),
        ),
      ],
    );
  }
}

class _ActiveQueueContent extends StatelessWidget {
  const _ActiveQueueContent({required this.entry});

  final ActiveQueueEntry entry;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _QueueCardHeader(),
        const SizedBox(height: 8),
        Text(
          entry.business?.name ?? 'Active queue',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Row(
          children: [
            Expanded(
              child: FittedBox(
                alignment: Alignment.centerLeft,
                fit: BoxFit.scaleDown,
                child: Text(
                  entry.queueNumber,
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ),
            Chip(
              avatar: Icon(
                _statusIcon(entry.status),
                size: 16,
                color: colors.primary,
              ),
              label: Text(entry.status.replaceAll('_', ' ')),
            ),
          ],
        ),
        const SizedBox(height: 6),
        Text(
          '${entry.peopleAhead} ahead • ${entry.estimatedWaitingTimeMinutes} min estimate',
        ),
        const SizedBox(height: 12),
        FilledButton.icon(
          onPressed: () => context.go('/my-queue'),
          icon: const Icon(Icons.confirmation_number_outlined),
          label: const Text('Track Queue'),
        ),
      ],
    );
  }

  IconData _statusIcon(String status) {
    return switch (status) {
      'CHECKED_IN' => Icons.fact_check_outlined,
      'CALLED' => Icons.campaign_outlined,
      'SERVING' => Icons.room_service_outlined,
      _ => Icons.schedule,
    };
  }
}
