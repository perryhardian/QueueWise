import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/theme/app_theme.dart';
import 'package:queuewise/features/auth/presentation/screens/login_screen.dart';

void main() {
  testWidgets('login screen remains usable at supported widths', (
    tester,
  ) async {
    addTearDown(() => tester.binding.setSurfaceSize(null));

    for (final width in <double>[320, 375, 414, 768]) {
      await tester.binding.setSurfaceSize(Size(width, 900));
      await tester.pumpWidget(
        ProviderScope(
          child: MaterialApp(theme: AppTheme.light, home: const LoginScreen()),
        ),
      );
      await tester.pump();

      expect(find.text('Your place in line, without the wait.'), findsOneWidget);
      expect(find.text('Email'), findsOneWidget);
      expect(find.text('Password'), findsOneWidget);
      expect(tester.takeException(), isNull, reason: 'Failed at ${width}px');
    }
  });
}
