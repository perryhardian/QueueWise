import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/controllers/auth_controller.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/register_screen.dart';
import '../../features/home/presentation/screens/customer_home_screen.dart';
import '../../features/merchant/presentation/screens/merchant_dashboard_placeholder_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);
  final user = authState.valueOrNull;

  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) {
      if (authState.isLoading) return null;

      final isAuthRoute = state.matchedLocation == '/login' || state.matchedLocation == '/register';
      if (user == null) return isAuthRoute ? null : '/login';

      if (isAuthRoute) return user.isMerchant ? '/merchant' : '/home';
      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(path: '/register', builder: (context, state) => const RegisterScreen()),
      GoRoute(path: '/home', builder: (context, state) => const CustomerHomeScreen()),
      GoRoute(path: '/merchant', builder: (context, state) => const MerchantDashboardPlaceholderScreen()),
    ],
    errorBuilder: (context, state) => const Scaffold(body: Center(child: Text('Page not found'))),
  );
});