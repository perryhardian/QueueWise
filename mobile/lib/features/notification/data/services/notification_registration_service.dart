import 'dart:io';

import 'package:dio/dio.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/network/dio_provider.dart';
import 'notification_preferences_service.dart';

final notificationRegistrationServiceProvider =
    Provider<NotificationRegistrationService>((ref) {
      return NotificationRegistrationService(
        ref.watch(dioProvider),
        ref.watch(notificationPreferencesServiceProvider),
      );
    });

class NotificationRegistrationService {
  const NotificationRegistrationService(this._dio, this._preferences);

  final Dio _dio;
  final NotificationPreferencesService _preferences;

  Future<bool> registerDevice() async {
    if (!await _preferences.isEnabled()) return unregisterDevice();
    final firebaseReady = await _ensureFirebaseReady();
    if (!firebaseReady) return false;

    final messaging = FirebaseMessaging.instance;
    final settings = await messaging.requestPermission();
    if (settings.authorizationStatus == AuthorizationStatus.denied) {
      return false;
    }

    final token = await messaging.getToken();
    if (token == null || token.isEmpty) return false;

    await _dio.post<void>(
      '/notifications/device-token',
      data: {'token': token, 'platform': _platform},
    );
    await _preferences.saveDeviceToken(token);
    return true;
  }

  Future<bool> unregisterDevice() async {
    String? token = await _preferences.readDeviceToken();
    if (await _ensureFirebaseReady()) {
      token = await FirebaseMessaging.instance.getToken() ?? token;
    }
    if (token == null || token.isEmpty) return true;

    await _dio.delete<void>(
      '/notifications/device-token',
      data: {'token': token},
    );
    await _preferences.clearDeviceToken();
    return true;
  }

  Future<bool> _ensureFirebaseReady() async {
    try {
      if (Firebase.apps.isEmpty) {
        await Firebase.initializeApp();
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  String get _platform {
    if (kIsWeb) return 'web';
    if (Platform.isAndroid) return 'android';
    if (Platform.isIOS) return 'ios';
    return 'unknown';
  }
}
