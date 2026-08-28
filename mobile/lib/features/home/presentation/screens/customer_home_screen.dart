import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_brand_mark.dart';
import '../../../../shared/widgets/app_page_header.dart';
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
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            ref.invalidate(nearbyBusinessesProvider);
            ref.invalidate(activeQueueControllerProvider);
          },
          child: ListView(
            padding: const EdgeInsets.fromLTRB(
              AppSpacing.page,
              AppSpacing.lg,
              AppSpacing.page,
              AppSpacing.section,
            ),
            children: [
              const Align(
                alignment: Alignment.centerLeft,
                child: AppBrandMark(compact: true),
              ),
              const SizedBox(height: AppSpacing.section),
              AppPageHeader(
                title: 'Hi, ${_firstName(user?.fullName)}.',
                subtitle: 'See your place in line or find a queue nearby.',
              ),
              const SizedBox(height: AppSpacing.lg),
              _HomeQueueCard(activeQueue: activeQueue),
              const SizedBox(height: AppSpacing.section),
              Row(
                children: [
                  Expanded(
                    child: Text(
                      'Nearby businesses',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.go('/explore'),
                    child: const Text('View all'),
                  ),
                ],
              ),
              const SizedBox(height: AppSpacing.sm),
              nearby.when(
                data: (items) => items.isEmpty
                    ? EmptyStateView(
                        title: 'No businesses yet',
                        message:
                            'Nearby businesses will appear here when they’re available.',
                        icon: Icons.storefront_outlined,
                        actionLabel: 'Refresh',
                        onAction: () =>
                            ref.invalidate(nearbyBusinessesProvider),
                      )
                    : Column(
                        children: [
                          for (final business in items.take(5)) ...[
                            BusinessCard(
                              business: business,
                              onTap: () =>
                                  context.go('/businesses/${business.id}'),
                            ),
                            const SizedBox(height: AppSpacing.sm),
                          ],
                        ],
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

  String _firstName(String? fullName) {
    final value = fullName?.trim();
    if (value == null || value.isEmpty) return 'there';
    return value.split(RegExp(r'\s+')).first;
  }
}

class _HomeQueueCard extends StatelessWidget {
  const _HomeQueueCard({required this.activeQueue});

  final AsyncValue<ActiveQueueEntry?> activeQueue;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: AppColors.ink,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.hero),
      ),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.page),
        child: activeQueue.when(
          data: (entry) => entry == null
              ? const _NoActiveQueueContent()
              : _ActiveQueueContent(entry: entry),
          loading: () => const SizedBox(
            height: 128,
            child: Center(
              child: CircularProgressIndicator(color: AppColors.accentInk),
            ),
          ),
          error: (_, _) => Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const _QueueCardHeader(),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Queue status unavailable',
                style: Theme.of(
                  context,
                ).textTheme.titleLarge?.copyWith(color: AppColors.accentInk),
              ),
              const SizedBox(height: AppSpacing.xs),
              Text(
                'Open My Queue to refresh your latest position.',
                style: Theme.of(
                  context,
                ).textTheme.bodyMedium?.copyWith(color: AppColors.rule),
              ),
              const SizedBox(height: AppSpacing.md),
              OutlinedButton.icon(
                onPressed: () => context.go('/my-queue'),
                icon: const Icon(Icons.confirmation_number_outlined),
                label: const Text('Open My Queue'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.accentInk,
                  side: const BorderSide(color: AppColors.rule2),
                ),
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
        const Icon(
          Icons.confirmation_number_outlined,
          color: AppColors.accentInk,
        ),
        const SizedBox(width: AppSpacing.xs),
        Text(
          'Your queue',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(color: AppColors.accentInk),
        ),
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
        const SizedBox(height: AppSpacing.sm),
        Text(
          'No active queue yet',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(color: AppColors.accentInk),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          'Find a business and join before you leave home.',
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: AppColors.rule),
        ),
        const SizedBox(height: AppSpacing.md),
        FilledButton.icon(
          onPressed: () => context.go('/explore'),
          icon: const Icon(Icons.search),
          label: const Text('Find a queue'),
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _QueueCardHeader(),
        const SizedBox(height: AppSpacing.sm),
        Text(
          entry.business?.name ?? 'Active queue',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(color: AppColors.rule),
        ),
        const SizedBox(height: AppSpacing.xs),
        Row(
          children: [
            Expanded(
              child: FittedBox(
                alignment: Alignment.centerLeft,
                fit: BoxFit.scaleDown,
                child: Text(
                  entry.queueNumber,
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                    color: AppColors.accentInk,
                  ),
                ),
              ),
            ),
            Chip(
              backgroundColor: AppColors.accentSoft,
              side: BorderSide.none,
              avatar: Icon(_statusIcon(entry.status), size: 16),
              label: Text(entry.status.replaceAll('_', ' ')),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          '${entry.peopleAhead} ahead · about ${entry.estimatedWaitingTimeMinutes} min',
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: AppColors.rule),
        ),
        const SizedBox(height: AppSpacing.md),
        FilledButton.icon(
          onPressed: () => context.go('/my-queue'),
          icon: const Icon(Icons.confirmation_number_outlined),
          label: const Text('Track queue'),
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
