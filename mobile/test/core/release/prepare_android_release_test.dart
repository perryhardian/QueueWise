import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

import '../../../tool/prepare_android_release.dart';

void main() {
  late Directory mobileDirectory;

  setUp(() {
    mobileDirectory = Directory.systemTemp.createTempSync(
      'queuewise-android-release-',
    );
  });

  tearDown(() {
    if (mobileDirectory.existsSync()) {
      mobileDirectory.deleteSync(recursive: true);
    }
  });

  test('materializes validated Android release files', () {
    final inputs = _validInputs(keystorePassword: r'store:=#\ password');

    final prepared = prepareAndroidRelease(
      inputs,
      mobileDirectory: mobileDirectory,
    );

    expect(prepared.keystoreFile.readAsBytesSync(), <int>[1, 2, 3, 4]);
    expect(
      prepared.keyPropertiesFile.readAsStringSync(),
      contains(r'storePassword=store\:\=\#\\\ password'),
    );
    expect(
      prepared.keyPropertiesFile.readAsStringSync(),
      contains('storeFile=app/upload-keystore.jks'),
    );
    expect(
      jsonDecode(prepared.firebaseConfigFile.readAsStringSync()),
      isA<Map<String, dynamic>>(),
    );
    expect(
      prepared.environmentFile.readAsStringSync(),
      'API_BASE_URL=https://api.queuewise.example/api\n'
      'SOCKET_URL=https://api.queuewise.example\n',
    );
  });

  test('reports every missing environment value', () {
    expect(
      () => AndroidReleaseInputs.fromEnvironment(const {}),
      throwsA(
        isA<StateError>()
            .having(
              (error) => error.message,
              'message',
              contains('ANDROID_UPLOAD_KEYSTORE_BASE64'),
            )
            .having(
              (error) => error.message,
              'message',
              contains('PRODUCTION_API_BASE_URL'),
            ),
      ),
    );
  });

  test('rejects invalid build metadata before writing files', () {
    final inputs = _validInputs(buildName: '1.0', buildNumber: '0');

    expect(
      () => prepareAndroidRelease(inputs, mobileDirectory: mobileDirectory),
      throwsFormatException,
    );
    expect(
      File('${mobileDirectory.path}/android/key.properties').existsSync(),
      isFalse,
    );
  });

  test('rejects insecure production URLs', () {
    final inputs = _validInputs(apiBaseUrl: 'http://api.queuewise.example/api');

    expect(
      () => prepareAndroidRelease(inputs, mobileDirectory: mobileDirectory),
      throwsStateError,
    );
  });

  test('rejects malformed base64 data', () {
    final inputs = _validInputs(uploadKeystoreBase64: 'not base64!');

    expect(
      () => prepareAndroidRelease(inputs, mobileDirectory: mobileDirectory),
      throwsFormatException,
    );
  });

  test('rejects Firebase configuration for another Android app', () {
    final inputs = _validInputs(firebasePackageName: 'com.example.other');

    expect(
      () => prepareAndroidRelease(inputs, mobileDirectory: mobileDirectory),
      throwsFormatException,
    );
  });
}

AndroidReleaseInputs _validInputs({
  String buildName = '1.0.0',
  String buildNumber = '1',
  String apiBaseUrl = 'https://api.queuewise.example/api',
  String socketUrl = 'https://api.queuewise.example',
  String uploadKeystoreBase64 = 'AQIDBA==',
  String keystorePassword = 'store-password',
  String firebasePackageName = 'com.queuewise.queuewise',
}) {
  final firebaseConfig = jsonEncode({
    'project_info': {'project_id': 'queuewise-production'},
    'client': [
      {
        'client_info': {
          'android_client_info': {'package_name': firebasePackageName},
        },
      },
    ],
  });

  return AndroidReleaseInputs(
    buildName: buildName,
    buildNumber: buildNumber,
    apiBaseUrl: apiBaseUrl,
    socketUrl: socketUrl,
    uploadKeystoreBase64: uploadKeystoreBase64,
    keystorePassword: keystorePassword,
    keyPassword: 'key-password',
    keyAlias: 'upload',
    firebaseAndroidConfigBase64: base64Encode(utf8.encode(firebaseConfig)),
  );
}
