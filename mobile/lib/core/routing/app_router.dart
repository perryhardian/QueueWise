import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/controllers/auth_controller.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/register_screen.dart';
import '../../features/business/presentation/screens/business_detail_screen.dart';
import '../../features/business/presentation/screens/explore_screen.dart';
import '../../features/history/presentation/screens/history_screen.dart';
import '../../features/home/presentation/screens/customer_home_screen.dart';
import '../../features/merchant/presentation/screens/merchant_dashboard_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';
import '../../features/queue/presentation/screens/my_queue_screen.dart';
import '../../features/queue/presentation/screens/queue_confirmation_screen.dart';
import 'customer_shell_screen.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _homeNavigatorKey = GlobalKey<NavigatorState>();
final _exploreNavigatorKey = GlobalKey<NavigatorState>();
final _queueNavigatorKey = GlobalKey<NavigatorState>();
final _historyNavigatorKey = GlobalKey<NavigatorState>();
final _profileNavigatorKey = GlobalKey<NavigatorState>();

final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);
  final user = authState.valueOrNull;
  return GoRouter(
    navigatorKey: _rootNavigatorKey,
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
      GoRoute(path: '/merchant', builder: (context, state) => const MerchantDashboardScreen()),
      GoRoute(parentNavigatorKey: _rootNavigatorKey, path: '/businesses/:id', builder: (context, state) => BusinessDetailScreen(businessId: state.pathParameters['id']!)),
      GoRoute(parentNavigatorKey: _rootNavigatorKey, path: '/businesses/:id/confirm-queue', builder: (context, state) => QueueConfirmationScreen(businessId: state.pathParameters['id']!)),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) => CustomerShellScreen(navigationShell: navigationShell),
        branches: [
          StatefulShellBranch(navigatorKey: _homeNavigatorKey, routes: [GoRoute(path: '/home', builder: (context, state) => const CustomerHomeScreen())]),
          StatefulShellBranch(navigatorKey: _exploreNavigatorKey, routes: [GoRoute(path: '/explore', builder: (context, state) => const ExploreScreen())]),
          StatefulShellBranch(navigatorKey: _queueNavigatorKey, routes: [GoRoute(path: '/my-queue', builder: (context, state) => const MyQueueScreen())]),
          StatefulShellBranch(navigatorKey: _historyNavigatorKey, routes: [GoRoute(path: '/history', builder: (context, state) => const HistoryScreen())]),
          StatefulShellBranch(navigatorKey: _profileNavigatorKey, routes: [GoRoute(path: '/profile', builder: (context, state) => const ProfileScreen())]),
        ],
      ),
    ],
    errorBuilder: (context, state) => const Scaffold(body: Center(child: Text('Page not found'))),
  );
});