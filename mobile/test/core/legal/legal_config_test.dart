import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/legal/legal_config.dart';

void main() {
  group('validateLegalUrls', () {
    test('accepts public HTTPS legal pages', () {
      expect(
        () => validateLegalUrls(
          privacyPolicyUrl: 'https://queuewise.example/privacy',
          accountDeletionUrl: 'https://queuewise.example/delete-account',
        ),
        returnsNormally,
      );
    });

    test('rejects missing, insecure, and local URLs', () {
      expect(
        () => validateLegalUrls(
          privacyPolicyUrl: '',
          accountDeletionUrl: 'https://queuewise.example/delete-account',
        ),
        throwsStateError,
      );
      expect(
        () => validateLegalUrls(
          privacyPolicyUrl: 'http://queuewise.example/privacy',
          accountDeletionUrl: 'https://localhost/delete-account',
        ),
        throwsStateError,
      );
    });
  });

  test('returns null for an invalid public legal URL', () {
    expect(parsePublicHttpsUrl('not a URL'), isNull);
    expect(parsePublicHttpsUrl('https://queuewise.example/privacy'), isNotNull);
  });
}
