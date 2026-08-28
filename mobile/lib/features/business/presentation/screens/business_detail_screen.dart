import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/state_views.dart';
import '../controllers/business_providers.dart';

class BusinessDetailScreen extends ConsumerWidget {
  const BusinessDetailScreen({required this.businessId, super.key});
  final String businessId;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final business = ref.watch(businessDetailProvider(businessId));
    return Scaffold(
      appBar: AppBar(title: const Text('Business details')),
      body: business.when(
        data: (item) {
          final q = item.queue;
          return Column(
            children: [
              Expanded(
                child: CustomScrollView(
                  slivers: [
                    SliverToBoxAdapter(
                      child: AspectRatio(
                        aspectRatio: 16 / 8,
                        child: Container(
                          color: AppColors.paper3,
                          child: item.imageUrl == null
                              ? const Icon(
                                  Icons.storefront_outlined,
                                  size: 56,
                                  color: AppColors.neutral,
                                )
                              : Image.network(
                                  item.imageUrl!,
                                  fit: BoxFit.cover,
                                  errorBuilder: (_, _, _) => const Icon(
                                    Icons.storefront_outlined,
                                    size: 56,
                                    color: AppColors.neutral,
                                  ),
                                ),
                        ),
                      ),
                    ),
                    SliverPadding(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      sliver: SliverList.list(
                        children: [
                          Text(
                            item.category.name.toUpperCase(),
                            style: Theme.of(context).textTheme.labelMedium
                                ?.copyWith(color: AppColors.accent),
                          ),
                          const SizedBox(height: AppSpacing.xxs),
                          Text(
                            item.name,
                            style: Theme.of(context).textTheme.headlineMedium,
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(
                                Icons.place_outlined,
                                size: 18,
                                color: AppColors.muted,
                              ),
                              const SizedBox(width: AppSpacing.xs),
                              Expanded(
                                child: Text(
                                  item.address,
                                  style: Theme.of(context).textTheme.bodyMedium
                                      ?.copyWith(color: AppColors.neutral),
                                ),
                              ),
                              if (item.rating != null) ...[
                                const SizedBox(width: AppSpacing.sm),
                                const Icon(
                                  Icons.star_rounded,
                                  size: 18,
                                  color: AppColors.warning,
                                ),
                                const SizedBox(width: AppSpacing.xxs),
                                Text(item.rating!.toStringAsFixed(1)),
                              ],
                            ],
                          ),
                          const SizedBox(height: AppSpacing.lg),
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
                                  'QUEUE STATUS',
                                  style: Theme.of(context).textTheme.labelMedium
                                      ?.copyWith(color: AppColors.paper3),
                                ),
                                const SizedBox(height: AppSpacing.xxs),
                                Text(
                                  q.status.replaceAll('_', ' '),
                                  style: Theme.of(context).textTheme.titleLarge
                                      ?.copyWith(color: AppColors.accentSoft),
                                ),
                                const SizedBox(height: AppSpacing.md),
                                Row(
                                  children: [
                                    Expanded(
                                      child: _Stat(
                                        label: 'Now serving',
                                        value: q.currentNumber ?? '—',
                                        inverse: true,
                                      ),
                                    ),
                                    Expanded(
                                      child: _Stat(
                                        label: 'Waiting',
                                        value: '${q.peopleWaiting}',
                                        inverse: true,
                                      ),
                                    ),
                                    Expanded(
                                      child: _Stat(
                                        label: 'Estimate',
                                        value:
                                            '${q.estimatedWaitingTimeMinutes} min',
                                        inverse: true,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: AppSpacing.xl),
                          Text(
                            'Services',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          if (item.services.isEmpty)
                            Text(
                              'No services listed yet.',
                              style: Theme.of(context).textTheme.bodyMedium
                                  ?.copyWith(color: AppColors.muted),
                            )
                          else
                            ...item.services.map(
                              (service) => Column(
                                children: [
                                  ListTile(
                                    contentPadding: EdgeInsets.zero,
                                    leading: const Icon(
                                      Icons.room_service_outlined,
                                    ),
                                    title: Text(service.name),
                                    trailing:
                                        service.estimatedDurationMinutes == null
                                        ? null
                                        : Text(
                                            '${service.estimatedDurationMinutes} min',
                                            style: Theme.of(context)
                                                .textTheme
                                                .labelLarge
                                                ?.copyWith(
                                                  color: AppColors.neutral,
                                                ),
                                          ),
                                  ),
                                  const Divider(),
                                ],
                              ),
                            ),
                        ],
                      ),
                    ),
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
                child: SafeArea(
                  top: false,
                  child: FilledButton.icon(
                    onPressed: q.id == null
                        ? null
                        : () => context.go(
                            '/businesses/$businessId/confirm-queue',
                          ),
                    icon: const Icon(Icons.add_rounded),
                    label: const Text('Join queue'),
                  ),
                ),
              ),
            ],
          );
        },
        loading: () => const LoadingStateView(),
        error: (_, _) => ErrorStateView(
          message: 'Unable to load business detail.',
          onRetry: () => ref.invalidate(businessDetailProvider(businessId)),
        ),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  const _Stat({required this.label, required this.value, this.inverse = false});
  final String label;
  final String value;
  final bool inverse;
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      FittedBox(
        fit: BoxFit.scaleDown,
        alignment: Alignment.centerLeft,
        child: Text(
          value,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            color: inverse ? AppColors.paper : AppColors.ink,
          ),
        ),
      ),
      const SizedBox(height: AppSpacing.xxs),
      Text(
        label,
        maxLines: 1,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
          color: inverse ? AppColors.paper3 : AppColors.muted,
        ),
      ),
    ],
  );
}
