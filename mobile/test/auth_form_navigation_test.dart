import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:queuewise/core/theme/app_theme.dart';
import 'package:queuewise/features/auth/domain/entities/auth_user.dart';
import 'package:queuewise/features/auth/presentation/controllers/auth_controller.dart';
import 'package:queuewise/features/auth/presentation/screens/login_screen.dart';
import 'package:queuewise/features/auth/presentation/screens/register_screen.dart';
import 'package:queuewise/features/auth/presentation/widgets/auth_error_banner.dart';

void main() {
  for (final destination in [
    'registration',
    'login via back',
    'login via link',
  ]) {
    testWidgets('switching to $destination clears the previous form error', (
      tester,
    ) async {
      await tester.binding.setSurfaceSize(const Size(500, 1400));
      addTearDown(() => tester.binding.setSurfaceSize(null));
      final fromLogin = destination == 'registration';
      final container = ProviderContainer(
        overrides: [
          authControllerProvider.overrideWith(_FailedAuthController.new),
        ],
      );
      addTearDown(container.dispose);
      final router = GoRouter(
        initialLocation: fromLogin ? '/login' : '/register',
        routes: [
          GoRoute(path: '/login', builder: (_, _) => const LoginScreen()),
          GoRoute(path: '/register', builder: (_, _) => const RegisterScreen()),
        ],
      );
      addTearDown(router.dispose);
      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: MaterialApp.router(theme: AppTheme.dark, routerConfig: router),
        ),
      );
      await tester.pumpAndSettle();
      (container.read(authControllerProvider.notifier) as _FailedAuthController)
          .fail();
      await tester.pumpAndSettle();
      expect(find.byType(AuthErrorBanner), findsOneWidget);

      final navigation = fromLogin
          ? find.text('Create account')
          : destination == 'login via back'
          ? find.byTooltip('Back to login')
          : find.text('Already have an account? Sign in');
      await tester.ensureVisible(navigation);
      await tester.tap(navigation);
      await tester.pumpAndSettle();

      expect(find.byType(AuthErrorBanner), findsNothing);
      expect(container.read(authControllerProvider).hasError, isFalse);
      expect(
        find.byType(fromLogin ? RegisterScreen : LoginScreen),
        findsOneWidget,
      );
      expect(tester.takeException(), isNull);
    });
  }
}

class _FailedAuthController extends AuthController {
  @override
  Future<AuthUser?> build() async => null;

  void fail() {
    state = AsyncError(StateError('Invalid credentials'), StackTrace.current);
  }
}
