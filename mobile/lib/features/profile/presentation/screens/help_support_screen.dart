import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';

class HelpSupportScreen extends StatelessWidget {
  const HelpSupportScreen({super.key});

  static const _supportEmail = String.fromEnvironment(
    'SUPPORT_EMAIL',
    defaultValue: 'support@queuewise.app',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(onPressed: () => _goBack(context)),
        title: const Text('Help and support'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          children: [
            const AppPageHeader(title: 'How can we help?'),
            const SizedBox(height: AppSpacing.xl),
            Text(
              'Frequently asked questions',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: AppSpacing.xs),
            const _FaqTile(
              question: 'How do I join a queue?',
              answer:
                  'Open Explore, select a business, then review the queue and tap Join queue.',
            ),
            const Divider(),
            const _FaqTile(
              question: 'How do I check in?',
              answer:
                  'Open My Queue, choose Check in, then scan the QR code shown at the counter.',
            ),
            const Divider(),
            const _FaqTile(
              question: 'When will I receive notifications?',
              answer:
                  'QueueWise alerts you when your turn is getting close and when the business calls you.',
            ),
            const SizedBox(height: AppSpacing.xl),
            FilledButton.icon(
              onPressed: () => _contactSupport(context),
              icon: const Icon(Icons.email_outlined),
              label: const Text('Contact support'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _contactSupport(BuildContext context) async {
    final uri = Uri(
      scheme: 'mailto',
      path: _supportEmail,
      queryParameters: const {'subject': 'QueueWise support request'},
    );
    try {
      final launched = await launchUrl(uri);
      if (!launched && context.mounted) _showLaunchError(context);
    } on Object {
      if (context.mounted) _showLaunchError(context);
    }
  }

  void _showLaunchError(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('No email app is available.')));
  }

  void _goBack(BuildContext context) {
    if (Navigator.of(context).canPop()) {
      context.pop();
    } else {
      context.go('/profile');
    }
  }
}

class _FaqTile extends StatelessWidget {
  const _FaqTile({required this.question, required this.answer});

  final String question;
  final String answer;

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      tilePadding: EdgeInsets.zero,
      childrenPadding: const EdgeInsets.only(bottom: AppSpacing.md),
      title: Text(question),
      children: [Align(alignment: Alignment.centerLeft, child: Text(answer))],
    );
  }
}
