import 'package:flutter/material.dart';

import '../../../../core/theme/app_tokens.dart';

class AuthTextField extends StatelessWidget {
  const AuthTextField({
    required this.controller,
    required this.label,
    required this.textInputAction,
    this.keyboardType,
    this.autofillHints,
    this.obscureText = false,
    this.onToggleObscureText,
    this.validator,
    super.key,
  });

  final TextEditingController controller;
  final String label;
  final TextInputAction textInputAction;
  final TextInputType? keyboardType;
  final Iterable<String>? autofillHints;
  final bool obscureText;
  final VoidCallback? onToggleObscureText;
  final String? Function(String?)? validator;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: Theme.of(context).textTheme.labelLarge),
        const SizedBox(height: AppSpacing.xs),
        TextFormField(
          controller: controller,
          keyboardType: keyboardType,
          autofillHints: autofillHints,
          obscureText: obscureText,
          textInputAction: textInputAction,
          validator: validator,
          decoration: InputDecoration(
            hintText: _hintFor(label),
            suffixIcon: onToggleObscureText == null
                ? null
                : IconButton(
                    tooltip: obscureText ? 'Show password' : 'Hide password',
                    onPressed: onToggleObscureText,
                    icon: Icon(
                      obscureText
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                    ),
                  ),
          ),
        ),
      ],
    );
  }

  String? _hintFor(String fieldLabel) {
    return switch (fieldLabel) {
      'Email' => 'name@example.com',
      'Phone Number' => '+62 812 3456 7890',
      _ => null,
    };
  }
}
