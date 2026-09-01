class LegalConfig {
  const LegalConfig._();

  static const _configuredPrivacyPolicyUrl = String.fromEnvironment(
    'PRIVACY_POLICY_URL',
  );
  static const _configuredAccountDeletionUrl = String.fromEnvironment(
    'ACCOUNT_DELETION_URL',
  );

  static Uri? get privacyPolicyUri =>
      parsePublicHttpsUrl(_configuredPrivacyPolicyUrl);
  static Uri? get accountDeletionUri =>
      parsePublicHttpsUrl(_configuredAccountDeletionUrl);

  static void validateForRelease() {
    validateLegalUrls(
      privacyPolicyUrl: _configuredPrivacyPolicyUrl,
      accountDeletionUrl: _configuredAccountDeletionUrl,
    );
  }
}

void validateLegalUrls({
  required String privacyPolicyUrl,
  required String accountDeletionUrl,
}) {
  for (final entry in {
    'PRIVACY_POLICY_URL': privacyPolicyUrl,
    'ACCOUNT_DELETION_URL': accountDeletionUrl,
  }.entries) {
    if (parsePublicHttpsUrl(entry.value) == null) {
      throw StateError(
        '${entry.key} must be a public HTTPS URL for release builds.',
      );
    }
  }
}

Uri? parsePublicHttpsUrl(String value) {
  final uri = Uri.tryParse(value.trim());
  if (uri == null || uri.scheme != 'https' || uri.host.isEmpty) return null;
  if (uri.host == 'localhost' ||
      uri.host == '127.0.0.1' ||
      uri.host == '10.0.2.2') {
    return null;
  }
  return uri;
}
