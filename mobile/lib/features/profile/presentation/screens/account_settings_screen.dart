import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_tokens.dart';
import '../../../../shared/widgets/app_page_header.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../../auth/presentation/utils/auth_error_message.dart';

class AccountSettingsScreen extends ConsumerStatefulWidget {
  const AccountSettingsScreen({super.key});

  @override
  ConsumerState<AccountSettingsScreen> createState() =>
      _AccountSettingsScreenState();
}

class _AccountSettingsScreenState extends ConsumerState<AccountSettingsScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _fullNameController;
  late final TextEditingController _phoneController;
  var _saving = false;

  @override
  void initState() {
    super.initState();
    final user = ref.read(authControllerProvider).valueOrNull;
    _fullNameController = TextEditingController(text: user?.fullName ?? '');
    _phoneController = TextEditingController(text: user?.phoneNumber ?? '');
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authControllerProvider).valueOrNull;
    return Scaffold(
      appBar: AppBar(
        leading: BackButton(onPressed: _goBack),
        title: const Text('Account settings'),
      ),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            children: [
              const AppPageHeader(
                title: 'Personal details',
              ),
              const SizedBox(height: AppSpacing.xl),
              Text('Full name', style: Theme.of(context).textTheme.labelLarge),
              const SizedBox(height: AppSpacing.xs),
              TextFormField(
                controller: _fullNameController,
                enabled: !_saving,
                textCapitalization: TextCapitalization.words,
                textInputAction: TextInputAction.next,
                decoration: const InputDecoration(
                  hintText: 'Your full name',
                  prefixIcon: Icon(Icons.person_outline),
                ),
                validator: (value) {
                  final name = value?.trim() ?? '';
                  if (name.length < 2) {
                    return 'Enter at least 2 characters.';
                  }
                  if (name.length > 120) {
                    return 'Use no more than 120 characters.';
                  }
                  return null;
                },
              ),
              const SizedBox(height: AppSpacing.md),
              Text('Email', style: Theme.of(context).textTheme.labelLarge),
              const SizedBox(height: AppSpacing.xs),
              TextFormField(
                initialValue: user?.email ?? '',
                readOnly: true,
                decoration: const InputDecoration(
                  prefixIcon: Icon(Icons.email_outlined),
                  helperText: 'Email cannot be changed from the app yet.',
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Phone number',
                style: Theme.of(context).textTheme.labelLarge,
              ),
              const SizedBox(height: AppSpacing.xs),
              TextFormField(
                controller: _phoneController,
                enabled: !_saving,
                keyboardType: TextInputType.phone,
                textInputAction: TextInputAction.done,
                decoration: const InputDecoration(
                  hintText: '+62 812 3456 7890',
                  prefixIcon: Icon(Icons.phone_outlined),
                ),
                validator: (value) {
                  if ((value?.trim().length ?? 0) > 30) {
                    return 'Use no more than 30 characters.';
                  }
                  return null;
                },
                onFieldSubmitted: (_) => _save(),
              ),
              const SizedBox(height: AppSpacing.lg),
              FilledButton.icon(
                onPressed: _saving ? null : _save,
                icon: _saving
                    ? const SizedBox.square(
                        dimension: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.save_outlined),
                label: Text(_saving ? 'Saving...' : 'Save changes'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _save() async {
    if (_saving || !(_formKey.currentState?.validate() ?? false)) return;
    setState(() => _saving = true);
    try {
      await ref
          .read(authControllerProvider.notifier)
          .updateProfile(
            fullName: _fullNameController.text.trim(),
            phoneNumber: _phoneController.text.trim(),
          );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Account details updated.')),
        );
      }
    } on Object catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              authErrorMessage(error, action: 'update your account'),
            ),
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  void _goBack() {
    if (Navigator.of(context).canPop()) {
      context.pop();
    } else {
      context.go('/profile');
    }
  }
}
