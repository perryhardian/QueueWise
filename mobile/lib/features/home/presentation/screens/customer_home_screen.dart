import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../shared/widgets/state_views.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../../business/presentation/controllers/business_providers.dart';
import '../../../business/presentation/widgets/business_card.dart';

class CustomerHomeScreen extends ConsumerWidget {
  const CustomerHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).valueOrNull;
    final nearby = ref.watch(nearbyBusinessesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async => ref.invalidate(nearbyBusinessesProvider),
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text('Hi, ${user?.fullName ?? 'Customer'}', style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 4),
              const Text('Find a queue before you leave.'),
              const SizedBox(height: 16),
              Card(
                color: Theme.of(context).colorScheme.primaryContainer,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.confirmation_number_outlined),
                          const SizedBox(width: 8),
                          Text('Your Queue', style: Theme.of(context).textTheme.titleMedium),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text('No active queue yet', style: Theme.of(context).textTheme.headlineSmall),
                      const SizedBox(height: 6),
                      const Text('Explore nearby businesses and join a queue online.'),
                      const SizedBox(height: 12),
                      FilledButton.icon(
                        onPressed: () => context.go('/explore'),
                        icon: const Icon(Icons.search),
                        label: const Text('Explore'),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text('Nearby Businesses', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 8),
              nearby.when(
                data: (items) => items.isEmpty
                    ? const EmptyStateView(title: 'No businesses yet', message: 'Seed or create businesses to see them here.')
                    : Column(
                        children: items
                            .take(5)
                            .map((business) => BusinessCard(
                                  business: business,
                                  onTap: () => context.go('/businesses/${business.id}'),
                                ))
                            .toList(),
                      ),
                loading: () => const SizedBox(height: 180, child: LoadingStateView()),
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