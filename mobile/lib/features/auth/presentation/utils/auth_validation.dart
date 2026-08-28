const _invalidEmailMessage = 'Enter a valid email address.';

final _emailLocalPartPattern = RegExp(r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$");
final _emailDomainLabelPattern = RegExp(
  r'^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$',
);

const _commonGmailDomainTypos = {
  'gmaail.com',
  'gamil.com',
  'gmial.com',
  'gnail.com',
};

String? validateEmailAddress(String? value) {
  final email = value?.trim() ?? '';
  if (email.isEmpty) return 'Enter your email address.';
  if (email.length > 254 || email.contains(RegExp(r'\s'))) {
    return _invalidEmailMessage;
  }

  final parts = email.split('@');
  if (parts.length != 2) return _invalidEmailMessage;

  final localPart = parts.first;
  final domain = parts.last.toLowerCase();
  if (localPart.isEmpty ||
      localPart.length > 64 ||
      localPart.startsWith('.') ||
      localPart.endsWith('.') ||
      localPart.contains('..') ||
      !_emailLocalPartPattern.hasMatch(localPart)) {
    return _invalidEmailMessage;
  }

  final domainLabels = domain.split('.');
  final hasValidDomain =
      domainLabels.length >= 2 &&
      domainLabels.last.length >= 2 &&
      domainLabels.every(_emailDomainLabelPattern.hasMatch);
  if (!hasValidDomain || _commonGmailDomainTypos.contains(domain)) {
    return _invalidEmailMessage;
  }

  return null;
}
