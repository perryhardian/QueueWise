import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/services/notification_preferences_service.dart';
import '../../data/services/notification_registration_service.dart';

final notificationSettingsControllerProvider =
    AsyncNotifierProvider<NotificationSettingsController, bool>(
      NotificationSettingsController.new,
    );

class NotificationSettingsController extends AsyncNotifier<bool> {
  late final NotificationPreferencesService _preferences;
  late final NotificationRegistrationService _registration;

  @override
  Future<bool> build() async {
    _preferences = ref.watch(notificationPreferencesServiceProvider);
    _registration = ref.watch(notificationRegistrationServiceProvider);
    return _preferences.isEnabled();
  }

  Future<bool> setEnabled(bool enabled) async {
    final previous = state.valueOrNull ?? true;
    state = const AsyncLoading();
    try {
      await _preferences.setEnabled(enabled);
    } on Object {
      state = AsyncData(previous);
      return false;
    }

    try {
      final synchronized = enabled
          ? await _registration.registerDevice()
          : await _registration.unregisterDevice();
      state = AsyncData(enabled);
      return synchronized;
    } on Object {
      state = AsyncData(enabled);
      return false;
    }
  }
}
