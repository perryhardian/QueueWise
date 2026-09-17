import 'package:flutter/foundation.dart';

class ApiConfig {
  const ApiConfig._();

  static const _configuredBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:3000/api',
  );
  static const _configuredSocketUrl = String.fromEnvironment(
    'SOCKET_URL',
    defaultValue: 'http://localhost:3000',
  );

  static String get baseUrl => _withoutTrailingSlash(
    _resolveAndroidEmulatorLoopback(_configuredBaseUrl),
  );
  static String get socketUrl => _withoutTrailingSlash(
    _resolveAndroidEmulatorLoopback(_configuredSocketUrl),
  );

  static void validateForRelease() {
    validateDeploymentUrls(apiBaseUrl: baseUrl, socketUrl: socketUrl);
  }

  static String _withoutTrailingSlash(String value) {
    return value.trim().replaceFirst(RegExp(r'/+$'), '');
  }

  static String _resolveAndroidEmulatorLoopback(String value) {
    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) {
      return value;
    }

    final uri = Uri.tryParse(value.trim());
    if (uri == null || (uri.host != 'localhost' && uri.host != '127.0.0.1')) {
      return value;
    }

    return uri.replace(host: '10.0.2.2').toString();
  }
}

void validateDeploymentUrls({
  required String apiBaseUrl,
  required String socketUrl,
}) {
  for (final entry in {
    'API_BASE_URL': apiBaseUrl,
    'SOCKET_URL': socketUrl,
  }.entries) {
    final uri = Uri.tryParse(entry.value.trim());
    if (uri == null || uri.scheme != 'https' || uri.host.isEmpty) {
      throw StateError(
        '${entry.key} must be a valid HTTPS URL for release builds.',
      );
    }
    if (uri.host == 'localhost' ||
        uri.host == '127.0.0.1' ||
        uri.host == '10.0.2.2') {
      throw StateError(
        '${entry.key} cannot point to a local development host in release builds.',
      );
    }
  }
}
