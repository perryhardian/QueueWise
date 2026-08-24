import '../entities/auth_user.dart';

abstract class AuthRepository {
  Future<AuthUser?> restoreSession();
  Future<AuthUser> login({required String email, required String password});
  Future<AuthUser> register({
    required String fullName,
    required String email,
    required String phoneNumber,
    required String password,
    required String role,
    String? merchantDisplayName,
  });
  Future<void> logout();
}