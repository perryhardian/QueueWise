import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../features/auth/data/datasources/auth_local_data_source.dart';
import '../../features/auth/data/models/auth_response_model.dart';
import 'api_config.dart';

final dioProvider = Provider<Dio>((ref) {
  final localDataSource = ref.watch(authLocalDataSourceProvider);
  final dio = Dio(
    BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
      headers: const {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    ),
  );

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await localDataSource.readAccessToken();
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) async {
        final statusCode = error.response?.statusCode;
        final retried = error.requestOptions.extra['retried'] == true;

        if (statusCode != 401 || retried) {
          handler.next(error);
          return;
        }

        final refreshToken = await localDataSource.readRefreshToken();
        if (refreshToken == null || refreshToken.isEmpty) {
          handler.next(error);
          return;
        }

        try {
          final refreshClient = Dio(BaseOptions(baseUrl: ApiConfig.baseUrl));
          final response = await refreshClient.post<Map<String, dynamic>>(
            '/auth/refresh',
            data: {'refreshToken': refreshToken},
          );
          final authResponse = AuthResponseModel.fromJson(response.data!);
          await localDataSource.saveTokens(
            accessToken: authResponse.accessToken,
            refreshToken: authResponse.refreshToken,
          );

          final retryOptions = error.requestOptions;
          retryOptions.extra['retried'] = true;
          retryOptions.headers['Authorization'] = 'Bearer ${authResponse.accessToken}';
          final retryResponse = await dio.fetch<dynamic>(retryOptions);
          handler.resolve(retryResponse);
        } catch (_) {
          await localDataSource.clearTokens();
          handler.next(error);
        }
      },
    ),
  );

  return dio;
});