import 'package:flutter/material.dart';

class MerchantStatusChip extends StatelessWidget {
  const MerchantStatusChip({required this.status, super.key});

  final String status;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final normalized = status.replaceAll('_', ' ');
    final Color background;
    final Color foreground;

    switch (status) {
      case 'OPEN':
      case 'WAITING':
      case 'CHECKED_IN':
        background = colors.primaryContainer;
        foreground = colors.onPrimaryContainer;
      case 'CALLED':
      case 'SERVING':
        background = colors.tertiaryContainer;
        foreground = colors.onTertiaryContainer;
      case 'COMPLETED':
        background = colors.secondaryContainer;
        foreground = colors.onSecondaryContainer;
      case 'NO_SHOW':
      case 'CANCELLED':
      case 'CLOSED':
        background = colors.errorContainer;
        foreground = colors.onErrorContainer;
      default:
        background = colors.surfaceContainerHighest;
        foreground = colors.onSurfaceVariant;
    }

    return Chip(
      backgroundColor: background,
      labelStyle: TextStyle(color: foreground, fontWeight: FontWeight.w600),
      side: BorderSide.none,
      label: Text(normalized),
    );
  }
}