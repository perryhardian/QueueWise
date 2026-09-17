import 'package:flutter/foundation.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/network/api_config.dart';

void main() {
  test('uses the host machine loopback address on Android emulators', () {
    debugDefaultTargetPlatformOverride = TargetPlatform.android;
    addTearDown(() => debugDefaultTargetPlatformOverride = null);

    expect(ApiConfig.baseUrl, 'http://10.0.2.2:3000/api');
    expect(ApiConfig.socketUrl, 'http://10.0.2.2:3000');
  });

  group('validateDeploymentUrls', () {
    test('accepts public HTTPS endpoints', () {
      expect(
        () => validateDeploymentUrls(
          apiBaseUrl: 'https://api.queuewise.example/api',
          socketUrl: 'https://api.queuewise.example',
        ),
        returnsNormally,
      );
    });

    test('rejects insecure endpoints', () {
      expect(
        () => validateDeploymentUrls(
          apiBaseUrl: 'http://api.queuewise.example/api',
          socketUrl: 'https://api.queuewise.example',
        ),
        throwsStateError,
      );
    });

    test('rejects emulator and localhost endpoints', () {
      expect(
        () => validateDeploymentUrls(
          apiBaseUrl: 'https://10.0.2.2/api',
          socketUrl: 'https://localhost',
        ),
        throwsStateError,
      );
    });
  });
}
