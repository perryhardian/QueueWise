import 'package:flutter/material.dart';

import '../../../../core/theme/app_tokens.dart';

class MerchantStatusChip extends StatelessWidget {
  const MerchantStatusChip({required this.status, super.key});

  final String status;

  @override
  Widget build(BuildContext context) {
    final normalized = status.replaceAll('_', ' ');
    final Color background;
    final Color foreground;

    switch (status) {
      case 'OPEN':
      case 'WAITING':
      case 'CHECKED_IN':
        background = AppColors.accentSoft;
        foreground = AppColors.ink;
      case 'CALLED':
      case 'SERVING':
        background = AppColors.infoContainer;
        foreground = AppColors.info;
      case 'COMPLETED':
        background = AppColors.paper3;
        foreground = AppColors.neutral;
      case 'NO_SHOW':
      case 'CANCELLED':
      case 'CLOSED':
        background = AppColors.errorContainer;
        foreground = AppColors.error;
      default:
        background = AppColors.paper2;
        foreground = AppColors.muted;
    }

    return Chip(
      backgroundColor: background,
      labelStyle: TextStyle(color: foreground, fontWeight: FontWeight.w600),
      side: BorderSide.none,
      visualDensity: VisualDensity.compact,
      label: Text(normalized),
    );
  }
}
