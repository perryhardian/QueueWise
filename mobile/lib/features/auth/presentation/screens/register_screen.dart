import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../controllers/auth_controller.dart';
import '../widgets/auth_error_banner.dart';
import '../widgets/auth_text_field.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;
  String _role = 'CUSTOMER';

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();
    if (!_formKey.currentState!.validate()) return;
    await ref.read(authControllerProvider.notifier).register(
          fullName: _fullNameController.text.trim(),
          email: _emailController.text.trim(),
          phoneNumber: _phoneController.text.trim(),
          password: _passwordController.text,
          role: _role,
          merchantDisplayName: _role == 'MERCHANT' ? _fullNameController.text.trim() : null,
        );
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);
    final isLoading = authState.isLoading;
    final errorMessage = authState.hasError ? _friendlyError(authState.error) : null;
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          tooltip: 'Back to login',
          onPressed: isLoading ? null : () => context.go('/login'),
          icon: const Icon(Icons.arrow_back),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 460),
              child: AutofillGroup(
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text('Create your account', style: textTheme.headlineMedium),
                      const SizedBox(height: 8),
                      Text('Join queues remotely or manage a business queue.', style: textTheme.bodyLarge),
                      const SizedBox(height: 24),
                      if (errorMessage != null) ...[
                        AuthErrorBanner(message: errorMessage),
                        const SizedBox(height: 16),
                      ],
                      SegmentedButton<String>(
                        segments: const [
                          ButtonSegment(value: 'CUSTOMER', label: Text('Customer'), icon: Icon(Icons.person_outline)),
                          ButtonSegment(value: 'MERCHANT', label: Text('Merchant'), icon: Icon(Icons.storefront_outlined)),
                        ],
                        selected: {_role},
                        onSelectionChanged: isLoading ? null : (values) => setState(() => _role = values.first),
                      ),
                      const SizedBox(height: 16),
                      AuthTextField(controller: _fullNameController, label: 'Full Name', autofillHints: const [AutofillHints.name], textInputAction: TextInputAction.next, validator: (value) => (value?.trim().isEmpty ?? true) ? 'Enter your full name.' : null),
                      const SizedBox(height: 16),
                      AuthTextField(controller: _emailController, label: 'Email', keyboardType: TextInputType.emailAddress, autofillHints: const [AutofillHints.email], textInputAction: TextInputAction.next, validator: _validateEmail),
                      const SizedBox(height: 16),
                      AuthTextField(controller: _phoneController, label: 'Phone Number', keyboardType: TextInputType.phone, autofillHints: const [AutofillHints.telephoneNumber], textInputAction: TextInputAction.next),
                      const SizedBox(height: 16),
                      AuthTextField(controller: _passwordController, label: 'Password', obscureText: _obscurePassword, autofillHints: const [AutofillHints.newPassword], textInputAction: TextInputAction.next, onToggleObscureText: () => setState(() => _obscurePassword = !_obscurePassword), validator: _validatePassword),
                      const SizedBox(height: 16),
                      AuthTextField(controller: _confirmPasswordController, label: 'Confirm Password', obscureText: _obscureConfirmPassword, autofillHints: const [AutofillHints.newPassword], textInputAction: TextInputAction.done, onToggleObscureText: () => setState(() => _obscureConfirmPassword = !_obscureConfirmPassword), validator: _validateConfirmPassword),
                      const SizedBox(height: 24),
                      FilledButton(
                        onPressed: isLoading ? null : _submit,
                        child: isLoading
                            ? const SizedBox.square(dimension: 20, child: CircularProgressIndicator(strokeWidth: 2))
                            : const Text('Register'),
                      ),
                      const SizedBox(height: 12),
                      TextButton(onPressed: isLoading ? null : () => context.go('/login'), child: const Text('Already have an account? Login')),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  String? _validateEmail(String? value) {
    final email = value?.trim() ?? '';
    if (email.isEmpty) return 'Enter your email address.';
    if (!email.contains('@')) return 'Enter a valid email address.';
    return null;
  }

  String? _validatePassword(String? value) {
    if ((value ?? '').length < 8) return 'Password must be at least 8 characters.';
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value != _passwordController.text) return 'Passwords do not match.';
    return null;
  }

  String _friendlyError(Object? error) {
    if (error is DioException) {
      final data = error.response?.data;
      if (data is Map && data['message'] is String) return data['message'] as String;
      return 'Unable to create the account. Check your connection and try again.';
    }
    return 'Unable to create the account. Please try again.';
  }
}