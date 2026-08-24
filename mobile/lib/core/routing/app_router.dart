import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const PhaseTwoSetupScreen(),
      ),
    ],
  );
});

class PhaseTwoSetupScreen extends StatelessWidget {
  const PhaseTwoSetupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(title: const Text('QueueWise')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Phase 2 Setup', style: textTheme.headlineMedium),
              const SizedBox(height: 12),
              Text(
                'Flutter project, dependencies, routing, theme, network config, and feature-first folders are ready.',
                style: textTheme.bodyLarge,
              ),
              const SizedBox(height: 24),
              const _SetupStatusItem(label: 'Riverpod configured'),
              const _SetupStatusItem(label: 'GoRouter configured'),
              const _SetupStatusItem(label: 'Dio base client configured'),
              const _SetupStatusItem(label: 'Material Design 3 theme configured'),
            ],
          ),
        ),
      ),
    );
  }
}

class _SetupStatusItem extends StatelessWidget {
  const _SetupStatusItem({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(Icons.check_circle, color: Theme.of(context).colorScheme.primary),
          const SizedBox(width: 12),
          Expanded(child: Text(label)),
        ],
      ),
    );
  }
}