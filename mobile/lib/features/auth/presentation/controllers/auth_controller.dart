import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../notification/data/services/notification_registration_service.dart';
import '../../data/repositories/auth_repository_impl.dart';
import '../../domain/entities/auth_user.dart';
import '../../domain/repositories/auth_repository.dart';

final authControllerProvider = AsyncNotifierProvider<AuthController, AuthUser?>(
  AuthController.new,
);

class AuthController extends AsyncNotifier<AuthUser?> {
  late final AuthRepository _repository;
  late final NotificationRegistrationService _notificationRegistrationService;

  @override
  Future<AuthUser?> build() async {
    _repository = ref.watch(authRepositoryProvider);
    _notificationRegistrationService = ref.watch(
      notificationRegistrationServiceProvider,
    );
    final user = await _repository.restoreSession();
    if (user != null) {
      unawaited(_notificationRegistrationService.registerDevice());
    }
    return user;
  }

  Future<void> login({required String email, required String password}) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => _repository.login(email: email, password: password),
    );
    if (state.valueOrNull != null) {
      unawaited(_notificationRegistrationService.registerDevice());
    }
  }

  Future<bool> register({
    required String fullName,
    required String email,
    required String phoneNumber,
    required String password,
    required String role,
    String? merchantDisplayName,
  }) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(
      () => _repository.register(
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        role: role,
        merchantDisplayName: merchantDisplayName,
      ),
    );
    if (state.valueOrNull != null) {
      unawaited(_notificationRegistrationService.registerDevice());
    }
    return state.valueOrNull != null;
  }

  Future<void> logout() async {
    state = const AsyncLoading();
    await _repository.logout();
    state = const AsyncData(null);
  }

  Future<void> deleteAccount({required String password}) async {
    if (state.valueOrNull == null) {
      throw StateError('No authenticated account is available.');
    }
    await _repository.deleteAccount(password: password);
    state = const AsyncData(null);
  }
}
