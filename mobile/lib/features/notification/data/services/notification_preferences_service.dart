import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final notificationPreferencesServiceProvider =
    Provider<NotificationPreferencesService>((ref) {
      return const NotificationPreferencesService();
    });

class NotificationPreferencesService {
  const NotificationPreferencesService();

  static const _enabledKey = 'queuewise.notifications_enabled';
  static const _deviceTokenKey = 'queuewise.notification_device_token';

  Future<bool> isEnabled() async {
    final preferences = await SharedPreferences.getInstance();
    return preferences.getBool(_enabledKey) ?? true;
  }

  Future<void> setEnabled(bool enabled) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setBool(_enabledKey, enabled);
  }

  Future<String?> readDeviceToken() async {
    final preferences = await SharedPreferences.getInstance();
    return preferences.getString(_deviceTokenKey);
  }

  Future<void> saveDeviceToken(String token) async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.setString(_deviceTokenKey, token);
  }

  Future<void> clearDeviceToken() async {
    final preferences = await SharedPreferences.getInstance();
    await preferences.remove(_deviceTokenKey);
  }
}
