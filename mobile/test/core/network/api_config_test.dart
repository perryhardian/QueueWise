import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/network/api_config.dart';

void main() {
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
