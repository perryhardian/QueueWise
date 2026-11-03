import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../core/theme/app_tokens.dart';

/// Decorative ticket artwork shared by the queue discovery and history views.
class QueueArtwork extends StatelessWidget {
  const QueueArtwork({this.archive = false, super.key});

  final bool archive;

  @override
  Widget build(BuildContext context) => ExcludeSemantics(
    child: AspectRatio(
      aspectRatio: 1.5,
      child: CustomPaint(painter: _TicketPainter(archive: archive)),
    ),
  );
}

class QueueJourney extends StatelessWidget {
  const QueueJourney({super.key});

  @override
  Widget build(BuildContext context) => Row(
    children: [
      for (var i = 0; i < 3; i++) ...[
        if (i > 0)
          const Expanded(
            child: Divider(color: AppColors.rule2, indent: 8, endIndent: 8),
          ),
        Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              [
                Icons.search_rounded,
                Icons.confirmation_number_outlined,
                Icons.qr_code_rounded,
              ][i],
              size: 18,
              color: i == 0 ? AppColors.accent : AppColors.muted,
            ),
            const SizedBox(height: 6),
            Text(
              ['Discover', 'Join', 'Check in'][i],
              style: Theme.of(
                context,
              ).textTheme.labelSmall?.copyWith(color: AppColors.neutral),
            ),
          ],
        ),
      ],
    ],
  );
}

class QueueEmptyPanel extends StatelessWidget {
  const QueueEmptyPanel({
    required this.onExplore,
    this.archive = false,
    super.key,
  });

  final VoidCallback onExplore;
  final bool archive;

  @override
  Widget build(BuildContext context) => Center(
    child: SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 28),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 420),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [AppColors.paper3, AppColors.paper2],
            ),
            border: Border.all(color: AppColors.rule),
            borderRadius: BorderRadius.circular(28),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Container(
                    width: 6,
                    height: 6,
                    decoration: BoxDecoration(
                      color: archive ? AppColors.muted : AppColors.accent,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    archive ? 'YOUR VISITS' : 'YOUR NEXT TURN',
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      letterSpacing: 2,
                      color: AppColors.neutral,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              SizedBox(width: 260, child: QueueArtwork(archive: archive)),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: FilledButton(
                  onPressed: onExplore,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Flexible(
                        child: Text(
                          archive ? 'Explore businesses' : 'Find a queue',
                        ),
                      ),
                      const SizedBox(width: 10),
                      const Icon(Icons.arrow_forward_rounded, size: 18),
                    ],
                  ),
                ),
              ),
              if (!archive) ...[
                const SizedBox(height: 24),
                const Divider(color: AppColors.rule),
                const SizedBox(height: 20),
                const QueueJourney(),
              ],
            ],
          ),
        ),
      ),
    ),
  );
}

class _TicketPainter extends CustomPainter {
  const _TicketPainter({required this.archive});
  final bool archive;

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(size.width / 300, size.height / 200);
    final glow = Paint()
      ..shader = RadialGradient(
        colors: [
          AppColors.accent.withValues(alpha: 0.12),
          AppColors.accent.withValues(alpha: 0),
        ],
      ).createShader(const Rect.fromLTWH(15, -25, 270, 250));
    canvas.drawOval(const Rect.fromLTWH(15, 0, 270, 200), glow);
    final orbit = Paint()
      ..color = AppColors.rule2.withValues(alpha: 0.45)
      ..style = PaintingStyle.stroke;
    canvas.drawOval(const Rect.fromLTWH(18, 20, 264, 162), orbit);
    canvas.drawOval(const Rect.fromLTWH(40, 4, 220, 194), orbit);
    if (archive) {
      _ticket(
        canvas,
        const Offset(135, 103),
        -0.20,
        AppColors.paper3,
        AppColors.rule2,
        false,
      );
      _ticket(
        canvas,
        const Offset(160, 96),
        0.12,
        AppColors.paper2,
        AppColors.neutral,
        true,
      );
    } else {
      _ticket(
        canvas,
        const Offset(150, 100),
        -0.12,
        AppColors.accent,
        AppColors.accentInk,
        true,
      );
    }
    for (final point in [
      const Offset(35, 58),
      const Offset(259, 143),
      const Offset(240, 32),
    ]) {
      final paint = Paint()
        ..color = archive ? AppColors.muted : AppColors.accent;
      canvas.drawCircle(point, 3, paint);
    }
    final spark = Paint()
      ..color = AppColors.accent
      ..strokeWidth = 2
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(const Offset(55, 143), const Offset(55, 157), spark);
    canvas.drawLine(const Offset(48, 150), const Offset(62, 150), spark);
    canvas.restore();
  }

  void _ticket(
    Canvas canvas,
    Offset center,
    double angle,
    Color fill,
    Color ink,
    bool detail,
  ) {
    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.rotate(angle);
    const rect = Rect.fromLTWH(-91, -53, 182, 106);
    final ticket = Path()
      ..addRRect(RRect.fromRectAndRadius(rect, const Radius.circular(16)));
    final notches = Path()
      ..addOval(const Rect.fromLTWH(-100, -9, 18, 18))
      ..addOval(const Rect.fromLTWH(82, -9, 18, 18));
    final shape = Path.combine(PathOperation.difference, ticket, notches);
    canvas.drawShadow(shape, Colors.black.withValues(alpha: 0.45), 12, false);
    canvas.drawPath(shape, Paint()..color = fill);
    canvas.drawPath(
      shape,
      Paint()
        ..color = ink.withValues(alpha: 0.35)
        ..style = PaintingStyle.stroke,
    );
    if (detail) {
      final line = Paint()
        ..color = ink.withValues(alpha: 0.35)
        ..strokeWidth = 1;
      for (double y = -39; y < 44; y += 9) {
        canvas.drawLine(Offset(38, y), Offset(38, math.min(y + 4, 43)), line);
      }
      final clock = Paint()
        ..color = ink
        ..strokeWidth = 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      canvas.drawCircle(const Offset(-25, -5), 20, clock);
      canvas.drawLine(const Offset(-25, -5), const Offset(-25, -17), clock);
      canvas.drawLine(const Offset(-25, -5), const Offset(-15, 1), clock);
      canvas.drawLine(
        const Offset(-45, 29),
        const Offset(-5, 29),
        Paint()
          ..color = ink.withValues(alpha: 0.4)
          ..strokeWidth = 4
          ..strokeCap = StrokeCap.round,
      );
      for (var i = 0; i < 7; i++) {
        canvas.drawRect(
          Rect.fromLTWH(53 + i * 3.0, -24, i.isEven ? 2 : 1, 48),
          Paint()..color = ink.withValues(alpha: 0.65),
        );
      }
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _TicketPainter oldDelegate) =>
      archive != oldDelegate.archive;
}
