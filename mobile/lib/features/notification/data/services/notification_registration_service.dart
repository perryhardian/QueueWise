import 'dart:io';

import 'package:dio/dio.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/network/dio_provider.dart';

final notificationRegistrationServiceProvider = Provider<NotificationRegistrationService>((ref) {
  return NotificationRegistrationService(ref.watch(dioProvider));
});

class NotificationRegistrationService {
  const NotificationRegistrationService(this._dio);

  final Dio _dio;

  Future<void> registerDevice() async {
    final firebaseReady = await _ensureFirebaseReady();
    if (!firebaseReady) return;

    final messaging = FirebaseMessaging.instance;
    final settings = await messaging.requestPermission();
    if (settings.authorizationStatus == AuthorizationStatus.denied) return;

    final token = await messaging.getToken();
    if (token == null || token.isEmpty) return;

    await _dio.post<void>(
      '/notifications/device-token',
      data: {
        'token': token,
        'platform': _platform,
      },
    );
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
