import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/auth_repository_impl.dart';
import '../../domain/entities/auth_user.dart';
import '../../domain/repositories/auth_repository.dart';

final authControllerProvider = AsyncNotifierProvider<AuthController, AuthUser?>(AuthController.new);

class AuthController extends AsyncNotifier<AuthUser?> {
  late final AuthRepository _repository;

  @override
  Future<AuthUser?> build() async {
    _repository = ref.watch(authRepositoryProvider);
    return _repository.restoreSession();
  }

  Future<void> login({required String email, required String password}) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => _repository.login(email: email, password: password));
  }

  Future<void> register({required String fullName, required String email, required String phoneNumber, required String password, required String role, String? merchantDisplayName}) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => _repository.register(fullName: fullName, email: email, phoneNumber: phoneNumber, password: password, role: role, merchantDisplayName: merchantDisplayName));
  }

  Future<void> logout() async {
    state = const AsyncLoading();
    await _repository.logout();
    state = const AsyncData(null);
  }
}