import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/auth/presentation/utils/auth_error_message.dart';

void main() {
  test('shows server validation arrays instead of a connection error', () {
    final error = DioException.badResponse(
      statusCode: 400,
      requestOptions: RequestOptions(path: '/auth/login'),
      response: Response<dynamic>(
        requestOptions: RequestOptions(path: '/auth/login'),
        statusCode: 400,
        data: {
          'message': ['email must be an email'],
        },
      ),
    );

    expect(
      authErrorMessage(error, action: 'sign in'),
      'Enter a valid email address.',
    );
  });

  test('only labels actual connection failures as connection problems', () {
    final error = DioException(
      requestOptions: RequestOptions(path: '/auth/login'),
      type: DioExceptionType.connectionError,
    );

    expect(
      authErrorMessage(error, action: 'sign in'),
      'Unable to sign in. Check your connection and try again.',
    );
  });
}
