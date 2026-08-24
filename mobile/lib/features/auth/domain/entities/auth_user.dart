class AuthUser {
  const AuthUser({
    required this.id,
    required this.fullName,
    required this.email,
    required this.role,
    this.phoneNumber,
  });

  final String id;
  final String fullName;
  final String email;
  final String role;
  final String? phoneNumber;

  bool get isMerchant => role == 'MERCHANT';
  bool get isCustomer => role == 'CUSTOMER';
}