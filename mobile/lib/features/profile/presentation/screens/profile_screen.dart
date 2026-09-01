import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../../core/legal/legal_config.dart';
import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../../auth/presentation/utils/auth_error_message.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  var _deletingAccount = false;

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authControllerProvider).valueOrNull;
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          children: [
            const AppPageHeader(
              eyebrow: 'YOUR ACCOUNT',
              title: 'Profile',
              subtitle: 'Manage how QueueWise works for you.',
            ),
            const SizedBox(height: AppSpacing.xl),
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.ink,
                borderRadius: BorderRadius.circular(AppRadii.hero),
              ),
              child: Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: const BoxDecoration(
                      color: AppColors.accentSoft,
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      _initials(user?.fullName),
                      style: Theme.of(
                        context,
                      ).textTheme.titleMedium?.copyWith(color: AppColors.ink),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user?.fullName ?? 'User',
                          style: Theme.of(context).textTheme.titleMedium
                              ?.copyWith(color: AppColors.paper),
                        ),
                        const SizedBox(height: AppSpacing.xxs),
                        Text(
                          user?.email ?? '',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.bodySmall
                              ?.copyWith(color: AppColors.paper3),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            Text('Preferences', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.xs),
            const _ProfileAction(
              leading: Icon(Icons.settings_outlined),
              title: 'Account settings',
            ),
            const Divider(),
            const _ProfileAction(
              leading: Icon(Icons.notifications_outlined),
              title: 'Notification settings',
            ),
            const Divider(),
            const _ProfileAction(
              leading: Icon(Icons.help_outline),
              title: 'Help and support',
            ),
            const SizedBox(height: AppSpacing.xl),
            Text(
              'Privacy & data',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: AppSpacing.xs),
            _ProfileAction(
              leading: const Icon(Icons.privacy_tip_outlined),
              title: 'Privacy policy',
              onTap: () => _openLegalPage(
                LegalConfig.privacyPolicyUri,
                label: 'privacy policy',
              ),
            ),
            const Divider(),
            _ProfileAction(
              leading: const Icon(Icons.manage_accounts_outlined),
              title: 'Account deletion help',
              onTap: () => _openLegalPage(
                LegalConfig.accountDeletionUri,
                label: 'account deletion page',
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            OutlinedButton.icon(
              onPressed: () =>
                  ref.read(authControllerProvider.notifier).logout(),
              icon: const Icon(Icons.logout_rounded, color: AppColors.error),
              label: const Text(
                'Log out',
                style: TextStyle(color: AppColors.error),
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            OutlinedButton.icon(
              onPressed: _deletingAccount ? null : _confirmAccountDeletion,
              icon: _deletingAccount
                  ? const SizedBox.square(
                      dimension: 18,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Icon(
                      Icons.delete_forever_outlined,
                      color: AppColors.error,
                    ),
              label: Text(
                _deletingAccount ? 'Deleting account…' : 'Delete account',
                style: const TextStyle(color: AppColors.error),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _initials(String? fullName) {
    final parts = (fullName ?? '').trim().split(RegExp(r'\s+'));
    final letters = parts
        .where((part) => part.isNotEmpty)
        .take(2)
        .map((part) => part[0].toUpperCase());
    return letters.isEmpty ? 'Q' : letters.join();
  }

  Future<void> _openLegalPage(Uri? uri, {required String label}) async {
    if (uri == null) {
      _showMessage('The $label is not configured for this build.');
      return;
    }

    try {
      final launched = await launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );
      if (!launched && mounted) {
        _showMessage('Unable to open the $label.');
      }
    } on Object {
      if (mounted) _showMessage('Unable to open the $label.');
    }
  }

  Future<void> _confirmAccountDeletion() async {
    final passwordController = TextEditingController();
    final password = await showDialog<String>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Delete your account?'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'This permanently deletes your account and personal data. '
              'De-identified queue records may remain for operational integrity.',
            ),
            const SizedBox(height: AppSpacing.md),
            TextField(
              controller: passwordController,
              autofocus: true,
              obscureText: true,
              textInputAction: TextInputAction.done,
              decoration: const InputDecoration(labelText: 'Current password'),
              onSubmitted: (value) {
                if (value.isNotEmpty) Navigator.of(dialogContext).pop(value);
              },
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: AppColors.error),
            onPressed: () {
              final value = passwordController.text;
              if (value.isNotEmpty) Navigator.of(dialogContext).pop(value);
            },
            child: const Text('Delete permanently'),
          ),
        ],
      ),
    );
    passwordController.dispose();
    if (password == null || password.isEmpty || !mounted) return;

    setState(() => _deletingAccount = true);
    try {
      await ref
          .read(authControllerProvider.notifier)
          .deleteAccount(password: password);
    } on Object catch (error) {
      if (mounted) {
        _showMessage(authErrorMessage(error, action: 'delete your account'));
      }
    } finally {
      if (mounted) setState(() => _deletingAccount = false);
    }
  }

  void _showMessage(String message) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(message)));
  }
}

class _ProfileAction extends StatelessWidget {
  const _ProfileAction({
    required this.leading,
    required this.title,
    this.onTap,
  });

  final Widget leading;
  final String title;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: onTap,
      contentPadding: EdgeInsets.zero,
      leading: IconTheme(
        data: const IconThemeData(color: AppColors.neutral),
        child: leading,
      ),
      title: Text(title),
      trailing: onTap == null
          ? null
          : const Icon(Icons.chevron_right_rounded, color: AppColors.muted),
    );
  }
}
