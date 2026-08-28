import 'package:dio/dio.dart';

String authErrorMessage(Object? error, {required String action}) {
  final fallback = 'Unable to $action. Please try again.';
  if (error is! DioException) return fallback;

  final serverMessage = _serverMessage(error.response?.data);
  if (serverMessage != null) return serverMessage;

  switch (error.type) {
    case DioExceptionType.connectionTimeout:
    case DioExceptionType.sendTimeout:
    case DioExceptionType.receiveTimeout:
    case DioExceptionType.transformTimeout:
    case DioExceptionType.connectionError:
      return 'Unable to $action. Check your connection and try again.';
    case DioExceptionType.badCertificate:
    case DioExceptionType.badResponse:
    case DioExceptionType.cancel:
    case DioExceptionType.unknown:
      return fallback;
  }
}

String? _serverMessage(Object? data) {
  if (data is! Map) return null;

  final message = data['message'];
  if (message is String && message.trim().isNotEmpty) {
    return _normalizeMessage(message);
  }
  if (message is List) {
    final messages = message
        .whereType<String>()
        .map(_normalizeMessage)
        .where((value) => value.isNotEmpty)
        .toSet()
        .toList();
    if (messages.isNotEmpty) return messages.join('\n');
  }

  return null;
}

String _normalizeMessage(String message) {
  final normalized = message.trim();
  final lowerCaseMessage = normalized.toLowerCase();

  if (lowerCaseMessage.contains('email must be an email')) {
    return 'Enter a valid email address.';
  }
  if (lowerCaseMessage == 'please register first') {
    return 'No account was found for this email. Create an account first.';
  }

  return normalized;
}
