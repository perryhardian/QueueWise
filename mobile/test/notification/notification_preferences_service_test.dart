import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/notification/data/services/notification_preferences_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  test('notifications are enabled by default and persist changes', () async {
    const service = NotificationPreferencesService();

    expect(await service.isEnabled(), isTrue);

    await service.setEnabled(false);
    expect(await service.isEnabled(), isFalse);
  });

  test('stores and clears the registered device token', () async {
    const service = NotificationPreferencesService();

    await service.saveDeviceToken('device-token');
    expect(await service.readDeviceToken(), 'device-token');

    await service.clearDeviceToken();
    expect(await service.readDeviceToken(), isNull);
  });
}
