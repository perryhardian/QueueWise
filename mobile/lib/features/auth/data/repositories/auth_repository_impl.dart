import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/auth_user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_local_data_source.dart';
import '../datasources/auth_remote_data_source.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepositoryImpl(
    remoteDataSource: ref.watch(authRemoteDataSourceProvider),
    localDataSource: ref.watch(authLocalDataSourceProvider),
  );
});

class AuthRepositoryImpl implements AuthRepository {
  const AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  final AuthRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  @override
  Future<AuthUser?> restoreSession() async {
    final accessToken = await localDataSource.readAccessToken();
    if (accessToken == null || accessToken.isEmpty) return null;

    try {
      return remoteDataSource.me();
    } on DioException {
      await localDataSource.clearTokens();
      return null;
    }
  }

  @override
  Future<AuthUser> login({required String email, required String password}) async {
    final response = await remoteDataSource.login(email: email, password: password);
    await localDataSource.saveTokens(accessToken: response.accessToken, refreshToken: response.refreshToken);
    return response.user;
  }

  @override
  Future<AuthUser> register({required String fullName, required String email, required String phoneNumber, required String password, required String role, String? merchantDisplayName}) async {
    final response = await remoteDataSource.register(
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: role,
      merchantDisplayName: merchantDisplayName,
    );
    await localDataSource.saveTokens(accessToken: response.accessToken, refreshToken: response.refreshToken);
    return response.user;
  }

  @override
  Future<void> logout() async {
    final refreshToken = await localDataSource.readRefreshToken();
    if (refreshToken != null && refreshToken.isNotEmpty) {
      try {
        await remoteDataSource.logout(refreshToken);
      } on DioException {
        // Local logout should still clear tokens when the network is unavailable.
      }
    }
    await localDataSource.clearTokens();
  }
}