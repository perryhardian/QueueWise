import 'package:flutter/material.dart';

import '../../core/theme/app_tokens.dart';

class AppBrandMark extends StatelessWidget {
  const AppBrandMark({
    this.showWordmark = true,
    this.compact = false,
    super.key,
  });

  final bool showWordmark;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final size = compact ? 36.0 : 44.0;
    return Semantics(
      label: 'QueueWise',
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: AppColors.ink,
              borderRadius: BorderRadius.circular(AppRadii.input),
            ),
            child: const Icon(
              Icons.schedule_rounded,
              color: AppColors.accentInk,
            ),
          ),
          if (showWordmark) ...[
            const SizedBox(width: AppSpacing.sm),
            Text('QueueWise', style: Theme.of(context).textTheme.titleLarge),
          ],
        ],
      ),
    );
  }
}
