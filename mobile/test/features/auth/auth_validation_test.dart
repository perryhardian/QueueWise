import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/auth/presentation/utils/auth_validation.dart';

void main() {
  group('validateEmailAddress', () {
    test('requires an email address', () {
      expect(validateEmailAddress(''), 'Enter your email address.');
    });

    test('rejects malformed addresses before a network request', () {
      for (final email in [
        'gmaail.com',
        '@gmaail.com',
        'user@',
        'user@gmail',
        'user@@gmail.com',
        'user name@gmail.com',
      ]) {
        expect(
          validateEmailAddress(email),
          'Enter a valid email address.',
          reason: email,
        );
      }
    });

    test('catches common Gmail domain typos', () {
      expect(
        validateEmailAddress('user@gmaail.com'),
        'Enter a valid email address.',
      );
      expect(
        validateEmailAddress('user@gmial.com'),
        'Enter a valid email address.',
      );
    });

    test('accepts a well-formed address', () {
      expect(validateEmailAddress('user.name+queue@gmail.com'), isNull);
    });
  });
}
