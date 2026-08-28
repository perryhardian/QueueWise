import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../domain/entities/merchant_queue_dashboard.dart';
import 'merchant_status_chip.dart';

typedef MerchantEntryAction = Future<void> Function(MerchantQueueEntry entry);

class MerchantQueueEntryCard extends StatelessWidget {
  const MerchantQueueEntryCard({
    required this.entry,
    required this.actionInProgress,
    required this.onCall,
    required this.onStart,
    required this.onComplete,
    required this.onNoShow,
    required this.onSkip,
    super.key,
  });

  final MerchantQueueEntry entry;
  final bool actionInProgress;
  final MerchantEntryAction onCall;
  final MerchantEntryAction onStart;
  final MerchantEntryAction onComplete;
  final MerchantEntryAction onNoShow;
  final MerchantEntryAction onSkip;

  @override
  Widget build(BuildContext context) {
    final joinedAt = DateFormat.Hm().format(entry.joinedAt.toLocal());

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 64,
                  height: 64,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.ink,
                    borderRadius: BorderRadius.circular(AppRadii.input),
                  ),
                  child: FittedBox(
                    fit: BoxFit.scaleDown,
                    child: Text(
                      entry.queueNumber,
                      style: Theme.of(
                        context,
                      ).textTheme.titleLarge?.copyWith(color: AppColors.paper),
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
                              'Customer ${entry.sequenceNumber}',
                              style: Theme.of(context).textTheme.titleMedium,
                            ),
                          ),
                          MerchantStatusChip(status: entry.status),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(
                        '${entry.source.replaceAll('_', ' ')} entry, joined at $joinedAt',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppColors.muted,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            _ActionRow(
              entry: entry,
              actionInProgress: actionInProgress,
              onCall: onCall,
              onStart: onStart,
              onComplete: onComplete,
              onNoShow: onNoShow,
              onSkip: onSkip,
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionRow extends StatelessWidget {
  const _ActionRow({
    required this.entry,
    required this.actionInProgress,
    required this.onCall,
    required this.onStart,
    required this.onComplete,
    required this.onNoShow,
    required this.onSkip,
  });

  final MerchantQueueEntry entry;
  final bool actionInProgress;
  final MerchantEntryAction onCall;
  final MerchantEntryAction onStart;
  final MerchantEntryAction onComplete;
  final MerchantEntryAction onNoShow;
  final MerchantEntryAction onSkip;

  @override
  Widget build(BuildContext context) {
    if (entry.canComplete) {
      return FilledButton.icon(
        onPressed: actionInProgress ? null : () => onComplete(entry),
        icon: const Icon(Icons.task_alt),
        label: const Text('Complete service'),
      );
    }

    if (entry.canStart) {
      return Row(
        children: [
          Expanded(
            child: FilledButton.icon(
              onPressed: actionInProgress ? null : () => onStart(entry),
              icon: const Icon(Icons.play_arrow),
              label: const Text('Start'),
            ),
          ),
          const SizedBox(width: AppSpacing.xs),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: actionInProgress ? null : () => onSkip(entry),
              icon: const Icon(Icons.skip_next),
              label: const Text('Skip'),
            ),
          ),
        ],
      );
    }

    if (entry.canCall) {
      return Row(
        children: [
          Expanded(
            child: FilledButton.icon(
              onPressed: actionInProgress ? null : () => onCall(entry),
              icon: const Icon(Icons.campaign_outlined),
              label: const Text('Call'),
            ),
          ),
          const SizedBox(width: AppSpacing.xs),
          Expanded(
            child: OutlinedButton.icon(
              onPressed: actionInProgress ? null : () => onNoShow(entry),
              icon: const Icon(Icons.person_off_outlined),
              label: const Text('No-show'),
            ),
          ),
        ],
      );
    }

    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: null,
        icon: const Icon(Icons.lock_outline),
        label: const Text('No action available'),
      ),
    );
  }
}
