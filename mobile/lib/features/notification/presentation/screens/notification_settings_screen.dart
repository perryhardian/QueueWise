import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../controllers/notification_settings_controller.dart';

class NotificationSettingsScreen extends ConsumerWidget {
  const NotificationSettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final setting = ref.watch(notificationSettingsControllerProvider);
    final enabled = setting.valueOrNull ?? true;
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(onPressed: () => _goBack(context)),
        title: const Text('Notification settings'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          children: [
            const AppPageHeader(
              title: 'Queue notifications',
            ),
            const SizedBox(height: AppSpacing.xl),
            SwitchListTile.adaptive(
              contentPadding: EdgeInsets.zero,
              value: enabled,
              onChanged: setting.isLoading
                  ? null
                  : (value) => _changeSetting(context, ref, value),
              title: const Text('Queue notifications'),
              subtitle: const Text(
                'Receive updates when your turn is getting close or you are called.',
              ),
              secondary: const Icon(Icons.notifications_active_outlined),
            ),
            if (setting.isLoading) ...[
              const SizedBox(height: AppSpacing.sm),
              const LinearProgressIndicator(),
            ],
          ],
        ),
      ),
    );
  }

  Future<void> _changeSetting(
    BuildContext context,
    WidgetRef ref,
    bool value,
  ) async {
    final synchronized = await ref
        .read(notificationSettingsControllerProvider.notifier)
        .setEnabled(value);
    if (!context.mounted) return;
    final message = synchronized
        ? value
              ? 'Queue notifications enabled.'
              : 'Queue notifications disabled.'
        : 'Preference saved. Device sync will retry when available.';
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(message)));
  }

  void _goBack(BuildContext context) {
    if (Navigator.of(context).canPop()) {
      context.pop();
    } else {
      context.go('/profile');
    }
  }
}
