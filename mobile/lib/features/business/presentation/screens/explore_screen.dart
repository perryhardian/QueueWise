import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../../shared/widgets/state_views.dart';
import '../controllers/business_providers.dart';
import '../widgets/business_card.dart';

class ExploreScreen extends ConsumerWidget {
  const ExploreScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cats = ref.watch(businessCategoriesProvider);
    final list = ref.watch(businessListProvider);
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.fromLTRB(
                AppSpacing.lg,
                AppSpacing.lg,
                AppSpacing.lg,
                AppSpacing.sm,
              ),
              child: AppPageHeader(
                eyebrow: 'FIND A PLACE',
                title: 'Explore queues',
                subtitle: 'Compare the wait before you leave.',
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Search businesses',
                    style: Theme.of(context).textTheme.labelLarge,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  TextField(
                    textInputAction: TextInputAction.search,
                    decoration: const InputDecoration(
                      prefixIcon: Icon(Icons.search),
                      hintText: 'Name or address',
                    ),
                    onChanged: (v) =>
                        ref.read(searchQueryProvider.notifier).state = v.trim(),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            SizedBox(
              height: 44,
              child: cats.when(
                data: (items) => ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.lg,
                  ),
                  children: [
                    _Filter(
                      label: 'All',
                      selected: ref.watch(selectedCategoryProvider) == null,
                      onTap: () =>
                          ref.read(selectedCategoryProvider.notifier).state =
                              null,
                    ),
                    ...items.map(
                      (c) => _Filter(
                        label: c.name,
                        selected: ref.watch(selectedCategoryProvider) == c.slug,
                        onTap: () =>
                            ref.read(selectedCategoryProvider.notifier).state =
                                c.slug,
                      ),
                    ),
                  ],
                ),
                loading: () => const LoadingStateView(),
                error: (_, _) => const SizedBox.shrink(),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(
                AppSpacing.lg,
                AppSpacing.sm,
                AppSpacing.lg,
                AppSpacing.md,
              ),
              child: SegmentedButton<String?>(
                segments: const [
                  ButtonSegment(value: null, label: Text('Default')),
                  ButtonSegment(value: 'shortest', label: Text('Shortest')),
                  ButtonSegment(value: 'longest', label: Text('Longest')),
                ],
                selected: {ref.watch(queueLengthFilterProvider)},
                onSelectionChanged: (v) =>
                    ref.read(queueLengthFilterProvider.notifier).state =
                        v.first,
              ),
            ),
            Expanded(
              child: list.when(
                data: (items) => items.isEmpty
                    ? EmptyStateView(
                        title: 'No results found',
                        message: 'Try another keyword or category.',
                        actionLabel: 'Clear filters',
                        onAction: () {
                          ref.read(searchQueryProvider.notifier).state = '';
                          ref.read(selectedCategoryProvider.notifier).state =
                              null;
                          ref.read(queueLengthFilterProvider.notifier).state =
                              null;
                        },
                      )
                    : RefreshIndicator(
                        onRefresh: () async =>
                            ref.invalidate(businessListProvider),
                        child: ListView.builder(
                          padding: const EdgeInsets.fromLTRB(
                            AppSpacing.lg,
                            0,
                            AppSpacing.lg,
                            AppSpacing.lg,
                          ),
                          itemCount: items.length,
                          itemBuilder: (context, i) => Padding(
                            padding: const EdgeInsets.only(
                              bottom: AppSpacing.sm,
                            ),
                            child: BusinessCard(
                              business: items[i],
                              onTap: () =>
                                  context.go('/businesses/${items[i].id}'),
                            ),
                          ),
                        ),
                      ),
                loading: () => const LoadingStateView(),
                error: (_, _) => ErrorStateView(
                  message: 'Unable to load businesses.',
                  onRetry: () => ref.invalidate(businessListProvider),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Filter extends StatelessWidget {
  const _Filter({
    required this.label,
    required this.selected,
    required this.onTap,
  });
  final String label;
  final bool selected;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(right: AppSpacing.xs),
    child: FilterChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => onTap(),
    ),
  );
}
