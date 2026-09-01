import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:queuewise/core/legal/legal_config.dart';
import 'package:queuewise/core/network/api_config.dart';

const _androidPackageName = 'com.queuewise.queuewise';
const _maximumAndroidVersionCode = 2100000000;

class AndroidReleaseInputs {
  const AndroidReleaseInputs({
    required this.buildName,
    required this.buildNumber,
    required this.apiBaseUrl,
    required this.socketUrl,
    required this.privacyPolicyUrl,
    required this.accountDeletionUrl,
    required this.uploadKeystoreBase64,
    required this.keystorePassword,
    required this.keyPassword,
    required this.keyAlias,
    required this.firebaseAndroidConfigBase64,
  });

  factory AndroidReleaseInputs.fromEnvironment(
    Map<String, String> environment,
  ) {
    const names = <String>[
      'BUILD_NAME',
      'BUILD_NUMBER',
      'PRODUCTION_API_BASE_URL',
      'PRODUCTION_SOCKET_URL',
      'PRIVACY_POLICY_URL',
      'ACCOUNT_DELETION_URL',
      'ANDROID_UPLOAD_KEYSTORE_BASE64',
      'ANDROID_KEYSTORE_PASSWORD',
      'ANDROID_KEY_PASSWORD',
      'ANDROID_KEY_ALIAS',
      'FIREBASE_ANDROID_CONFIG_BASE64',
    ];
    final missing = names
        .where((name) => (environment[name] ?? '').trim().isEmpty)
        .toList();
    if (missing.isNotEmpty) {
      throw StateError(
        'Missing Android release configuration: ${missing.join(', ')}.',
      );
    }

    return AndroidReleaseInputs(
      buildName: environment['BUILD_NAME']!,
      buildNumber: environment['BUILD_NUMBER']!,
      apiBaseUrl: environment['PRODUCTION_API_BASE_URL']!,
      socketUrl: environment['PRODUCTION_SOCKET_URL']!,
      privacyPolicyUrl: environment['PRIVACY_POLICY_URL']!,
      accountDeletionUrl: environment['ACCOUNT_DELETION_URL']!,
      uploadKeystoreBase64: environment['ANDROID_UPLOAD_KEYSTORE_BASE64']!,
      keystorePassword: environment['ANDROID_KEYSTORE_PASSWORD']!,
      keyPassword: environment['ANDROID_KEY_PASSWORD']!,
      keyAlias: environment['ANDROID_KEY_ALIAS']!,
      firebaseAndroidConfigBase64:
          environment['FIREBASE_ANDROID_CONFIG_BASE64']!,
    );
  }

  final String buildName;
  final String buildNumber;
  final String apiBaseUrl;
  final String socketUrl;
  final String privacyPolicyUrl;
  final String accountDeletionUrl;
  final String uploadKeystoreBase64;
  final String keystorePassword;
  final String keyPassword;
  final String keyAlias;
  final String firebaseAndroidConfigBase64;
}

class PreparedAndroidRelease {
  const PreparedAndroidRelease({
    required this.keystoreFile,
    required this.keyPropertiesFile,
    required this.firebaseConfigFile,
    required this.environmentFile,
  });

  final File keystoreFile;
  final File keyPropertiesFile;
  final File firebaseConfigFile;
  final File environmentFile;
}

PreparedAndroidRelease prepareAndroidRelease(
  AndroidReleaseInputs inputs, {
  required Directory mobileDirectory,
}) {
  _validateBuildVersion(inputs.buildName, inputs.buildNumber);
  validateDeploymentUrls(
    apiBaseUrl: inputs.apiBaseUrl,
    socketUrl: inputs.socketUrl,
  );
  validateLegalUrls(
    privacyPolicyUrl: inputs.privacyPolicyUrl,
    accountDeletionUrl: inputs.accountDeletionUrl,
  );
  _validateSingleLine('ANDROID_KEYSTORE_PASSWORD', inputs.keystorePassword);
  _validateSingleLine('ANDROID_KEY_PASSWORD', inputs.keyPassword);
  _validateSingleLine('ANDROID_KEY_ALIAS', inputs.keyAlias);

  final keystoreBytes = _decodeBase64(
    'ANDROID_UPLOAD_KEYSTORE_BASE64',
    inputs.uploadKeystoreBase64,
  );
  if (keystoreBytes.isEmpty) {
    throw const FormatException('Android upload keystore is empty.');
  }

  final firebaseBytes = _decodeBase64(
    'FIREBASE_ANDROID_CONFIG_BASE64',
    inputs.firebaseAndroidConfigBase64,
  );
  _validateFirebaseConfig(firebaseBytes);

  final androidDirectory = Directory(
    '${mobileDirectory.path}${Platform.pathSeparator}android',
  );
  final appDirectory = Directory(
    '${androidDirectory.path}${Platform.pathSeparator}app',
  );
  final keystoreFile = File(
    '${appDirectory.path}${Platform.pathSeparator}upload-keystore.jks',
  );
  final keyPropertiesFile = File(
    '${androidDirectory.path}${Platform.pathSeparator}key.properties',
  );
  final firebaseConfigFile = File(
    '${appDirectory.path}${Platform.pathSeparator}google-services.json',
  );
  final environmentFile = File(
    '${mobileDirectory.path}${Platform.pathSeparator}.env.production',
  );

  appDirectory.createSync(recursive: true);
  keystoreFile.writeAsBytesSync(keystoreBytes, flush: true);
  firebaseConfigFile.writeAsBytesSync(firebaseBytes, flush: true);
  keyPropertiesFile.writeAsStringSync(
    'storePassword=${_escapePropertyValue(inputs.keystorePassword)}\n'
    'keyPassword=${_escapePropertyValue(inputs.keyPassword)}\n'
    'keyAlias=${_escapePropertyValue(inputs.keyAlias)}\n'
    'storeFile=app/upload-keystore.jks\n',
    flush: true,
  );
  environmentFile.writeAsStringSync(
    'API_BASE_URL=${inputs.apiBaseUrl.trim()}\n'
    'SOCKET_URL=${inputs.socketUrl.trim()}\n'
    'PRIVACY_POLICY_URL=${inputs.privacyPolicyUrl.trim()}\n'
    'ACCOUNT_DELETION_URL=${inputs.accountDeletionUrl.trim()}\n',
    flush: true,
  );

  return PreparedAndroidRelease(
    keystoreFile: keystoreFile,
    keyPropertiesFile: keyPropertiesFile,
    firebaseConfigFile: firebaseConfigFile,
    environmentFile: environmentFile,
  );
}

void _validateBuildVersion(String buildName, String buildNumber) {
  final normalizedName = buildName.trim();
  if (!RegExp(r'^\d+\.\d+\.\d+$').hasMatch(normalizedName)) {
    throw const FormatException(
      'BUILD_NAME must contain three numeric parts, for example 1.0.0.',
    );
  }

  final normalizedNumber = buildNumber.trim();
  if (!RegExp(r'^[1-9]\d*$').hasMatch(normalizedNumber)) {
    throw const FormatException('BUILD_NUMBER must be a positive integer.');
  }
  final parsedNumber = int.tryParse(normalizedNumber);
  if (parsedNumber == null || parsedNumber > _maximumAndroidVersionCode) {
    throw const FormatException(
      'BUILD_NUMBER exceeds the Android version-code limit.',
    );
  }
}

void _validateSingleLine(String name, String value) {
  if (value.isEmpty ||
      value.trim() != value ||
      value.contains(RegExp(r'[\r\n]'))) {
    throw FormatException('$name must be a non-empty, single-line value.');
  }
}

Uint8List _decodeBase64(String name, String value) {
  try {
    return base64Decode(value.replaceAll(RegExp(r'\s'), ''));
  } on FormatException {
    throw FormatException('$name must contain valid base64 data.');
  }
}

void _validateFirebaseConfig(Uint8List bytes) {
  Object? decoded;
  try {
    decoded = jsonDecode(utf8.decode(bytes));
  } on FormatException {
    throw const FormatException(
      'FIREBASE_ANDROID_CONFIG_BASE64 must decode to valid UTF-8 JSON.',
    );
  }

  if (decoded is! Map<String, dynamic>) {
    throw const FormatException('Firebase Android configuration is invalid.');
  }
  final projectInfo = decoded['project_info'];
  final projectId = projectInfo is Map<String, dynamic>
      ? projectInfo['project_id']
      : null;
  final clients = decoded['client'];
  final hasMatchingClient =
      clients is List &&
      clients.whereType<Map<String, dynamic>>().any((client) {
        final clientInfo = client['client_info'];
        if (clientInfo is! Map<String, dynamic>) return false;
        final androidInfo = clientInfo['android_client_info'];
        return androidInfo is Map<String, dynamic> &&
            androidInfo['package_name'] == _androidPackageName;
      });

  if (projectId is! String || projectId.trim().isEmpty || !hasMatchingClient) {
    throw const FormatException(
      'Firebase Android configuration must target com.queuewise.queuewise.',
    );
  }
}

String _escapePropertyValue(String value) {
  final output = StringBuffer();
  for (final codeUnit in value.codeUnits) {
    switch (codeUnit) {
      case 0x09:
        output.write(r'\t');
      case 0x0c:
        output.write(r'\f');
      case 0x20:
        output.write(r'\ ');
      case 0x21:
        output.write(r'\!');
      case 0x23:
        output.write(r'\#');
      case 0x3a:
        output.write(r'\:');
      case 0x3d:
        output.write(r'\=');
      case 0x5c:
        output.write(r'\\');
      default:
        if (codeUnit < 0x20 || codeUnit > 0x7e) {
          output.write('\\u${codeUnit.toRadixString(16).padLeft(4, '0')}');
        } else {
          output.writeCharCode(codeUnit);
        }
    }
  }
  return output.toString();
}

void main() {
  try {
    final inputs = AndroidReleaseInputs.fromEnvironment(Platform.environment);
    prepareAndroidRelease(inputs, mobileDirectory: Directory.current);
    stdout.writeln('Android release configuration prepared.');
  } on Object catch (error) {
    stderr.writeln('Unable to prepare Android release: $error');
    exitCode = 64;
  }
}
