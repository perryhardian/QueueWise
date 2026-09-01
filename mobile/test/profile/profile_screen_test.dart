import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/theme/app_theme.dart';
import 'package:queuewise/features/auth/domain/entities/auth_user.dart';
import 'package:queuewise/features/auth/presentation/controllers/auth_controller.dart';
import 'package:queuewise/features/profile/presentation/screens/profile_screen.dart';

void main() {
  testWidgets('profile exposes privacy and permanent account deletion', (
    tester,
  ) async {
    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          authControllerProvider.overrideWith(_AuthenticatedController.new),
        ],
        child: MaterialApp(theme: AppTheme.light, home: const ProfileScreen()),
      ),
    );
    await tester.pumpAndSettle();

    await tester.scrollUntilVisible(
      find.text('Privacy policy'),
      300,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Privacy policy'), findsOneWidget);

    await tester.scrollUntilVisible(
      find.text('Account deletion help'),
      300,
      scrollable: find.byType(Scrollable).first,
    );
    expect(find.text('Account deletion help'), findsOneWidget);

    await tester.scrollUntilVisible(
      find.text('Delete account'),
      300,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.tap(find.text('Delete account'));
    await tester.pumpAndSettle();

    expect(find.text('Delete your account?'), findsOneWidget);
    expect(find.text('Current password'), findsOneWidget);
    expect(find.text('Delete permanently'), findsOneWidget);
  });
}

class _AuthenticatedController extends AuthController {
  @override
  Future<AuthUser?> build() async => const AuthUser(
    id: 'user-1',
    fullName: 'QueueWise User',
    email: 'user@example.com',
    role: 'CUSTOMER',
  );
}
