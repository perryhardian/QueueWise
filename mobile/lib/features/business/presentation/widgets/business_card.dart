import 'package:flutter/material.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../domain/entities/business.dart';

class BusinessCard extends StatelessWidget {
  const BusinessCard({required this.business, required this.onTap, super.key});
  final Business business;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    final q = business.queue;
    return Semantics(
      button: true,
      label: 'Open ${business.name}',
      child: Card(
        color: AppColors.paper,
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.md),
            child: Column(
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 76,
                      height: 76,
                      decoration: BoxDecoration(
                        color: AppColors.paper3,
                        borderRadius: BorderRadius.circular(AppRadii.input),
                      ),
                      clipBehavior: Clip.antiAlias,
                      child: business.imageUrl == null
                          ? const Icon(
                              Icons.storefront_outlined,
                              color: AppColors.neutral,
                            )
                          : Image.network(
                              business.imageUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (_, _, _) => const Icon(
                                Icons.storefront_outlined,
                                color: AppColors.neutral,
                              ),
                            ),
                    ),
                    const SizedBox(width: AppSpacing.sm),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  business.name,
                                  style: Theme.of(
                                    context,
                                  ).textTheme.titleMedium,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              const Icon(
                                Icons.chevron_right_rounded,
                                color: AppColors.muted,
                              ),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.xxs),
                          Text(
                            business.category.name,
                            style: Theme.of(context).textTheme.labelMedium
                                ?.copyWith(color: AppColors.accent),
                          ),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            business.address,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: Theme.of(context).textTheme.bodySmall
                                ?.copyWith(color: AppColors.neutral),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.md),
                const Divider(),
                const SizedBox(height: AppSpacing.sm),
                Row(
                  children: [
                    _QueueMetric(
                      icon: Icons.confirmation_number_outlined,
                      value: q.currentNumber ?? '—',
                      label: 'Now serving',
                    ),
                    const _MetricDivider(),
                    _QueueMetric(
                      icon: Icons.groups_outlined,
                      value: '${q.peopleWaiting}',
                      label: 'Waiting',
                    ),
                    const _MetricDivider(),
                    _QueueMetric(
                      icon: Icons.schedule_outlined,
                      value: '${q.estimatedWaitingTimeMinutes} min',
                      label: 'Estimate',
                    ),
                  ],
                ),
                if (business.rating != null) ...[
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      const Icon(
                        Icons.star_rounded,
                        size: 16,
                        color: AppColors.warning,
                      ),
                      const SizedBox(width: AppSpacing.xxs),
                      Text(
                        business.rating!.toStringAsFixed(1),
                        style: Theme.of(context).textTheme.labelMedium,
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _QueueMetric extends StatelessWidget {
  const _QueueMetric({
    required this.icon,
    required this.value,
    required this.label,
  });

  final IconData icon;
  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Icon(icon, size: 18, color: AppColors.neutral),
          const SizedBox(height: AppSpacing.xxs),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(value, style: Theme.of(context).textTheme.titleSmall),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            maxLines: 1,
            style: Theme.of(
              context,
            ).textTheme.labelSmall?.copyWith(color: AppColors.muted),
          ),
        ],
      ),
    );
  }
}

class _MetricDivider extends StatelessWidget {
  const _MetricDivider();

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      height: 42,
      child: VerticalDivider(color: AppColors.rule),
    );
  }
}
