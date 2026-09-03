import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

const _maximumAppNameLength = 30;
const _maximumShortDescriptionLength = 80;
const _maximumFullDescriptionLength = 4000;
const _minimumLauncherSourceSize = 512;
const _playIconSize = 512;
const _maximumPlayIconBytes = 1024 * 1024;
const _featureGraphicWidth = 1024;
const _featureGraphicHeight = 500;
const _minimumPhoneScreenshotCount = 4;
const _maximumPhoneScreenshotCount = 8;
const _minimumScreenshotDimension = 320;
const _maximumScreenshotDimension = 3840;
const _maximumAltTextLength = 140;

class GooglePlayListing {
  const GooglePlayListing({
    required this.appName,
    required this.shortDescription,
    required this.fullDescription,
  });

  factory GooglePlayListing.fromJson(Map<String, dynamic> json) {
    String requireString(String name) {
      final value = json[name];
      if (value is! String || value.trim().isEmpty) {
        throw FormatException('$name must be a non-empty string.');
      }
      return value;
    }

    return GooglePlayListing(
      appName: requireString('appName'),
      shortDescription: requireString('shortDescription'),
      fullDescription: requireString('fullDescription'),
    );
  }

  final String appName;
  final String shortDescription;
  final String fullDescription;
}

class PngDimensions {
  const PngDimensions(this.width, this.height);

  final int width;
  final int height;
}

class PngMetadata {
  const PngMetadata({
    required this.width,
    required this.height,
    required this.bitDepth,
    required this.colorType,
  });

  final int width;
  final int height;
  final int bitDepth;
  final int colorType;

  bool get is24BitRgb => bitDepth == 8 && colorType == 2;
  bool get is32BitRgba => bitDepth == 8 && colorType == 6;
}

void validateGooglePlayListing(GooglePlayListing listing) {
  _validateSingleLine(
    name: 'appName',
    value: listing.appName,
    maximumLength: _maximumAppNameLength,
  );
  _validateSingleLine(
    name: 'shortDescription',
    value: listing.shortDescription,
    maximumLength: _maximumShortDescriptionLength,
  );
  if (listing.fullDescription.runes.length > _maximumFullDescriptionLength) {
    throw const FormatException(
      'fullDescription exceeds the 4000-character Google Play limit.',
    );
  }
}

PngDimensions readPngDimensions(Uint8List bytes) {
  final metadata = readPngMetadata(bytes);
  return PngDimensions(metadata.width, metadata.height);
}

PngMetadata readPngMetadata(Uint8List bytes) {
  const pngSignature = <int>[137, 80, 78, 71, 13, 10, 26, 10];
  final hasPngSignature =
      bytes.length >= pngSignature.length &&
      List.generate(
        pngSignature.length,
        (index) => bytes[index] == pngSignature[index],
      ).every((matches) => matches);
  if (bytes.length < 26 || !hasPngSignature) {
    throw const FormatException('Asset must be a valid PNG.');
  }

  final data = ByteData.sublistView(bytes);
  final chunkType = ascii.decode(bytes.sublist(12, 16));
  if (chunkType != 'IHDR') {
    throw const FormatException('Launcher icon PNG is missing its IHDR chunk.');
  }
  return PngMetadata(
    width: data.getUint32(16),
    height: data.getUint32(20),
    bitDepth: bytes[24],
    colorType: bytes[25],
  );
}

void validateLauncherIconSource(Uint8List bytes) {
  final dimensions = readPngDimensions(bytes);
  if (dimensions.width != dimensions.height) {
    throw const FormatException('Launcher icon source must be square.');
  }
  if (dimensions.width < _minimumLauncherSourceSize) {
    throw const FormatException(
      'Launcher icon source must be at least 512 x 512 pixels.',
    );
  }
}

void validatePlayIcon(Uint8List bytes) {
  final metadata = readPngMetadata(bytes);
  if (metadata.width != _playIconSize || metadata.height != _playIconSize) {
    throw const FormatException('Play icon must be exactly 512 x 512 pixels.');
  }
  if (!metadata.is32BitRgba) {
    throw const FormatException('Play icon must be a 32-bit PNG with alpha.');
  }
  if (bytes.length > _maximumPlayIconBytes) {
    throw const FormatException('Play icon must not exceed 1024 KB.');
  }
}

void validateFeatureGraphic(Uint8List bytes) {
  final metadata = readPngMetadata(bytes);
  if (metadata.width != _featureGraphicWidth ||
      metadata.height != _featureGraphicHeight) {
    throw const FormatException(
      'Feature graphic must be exactly 1024 x 500 pixels.',
    );
  }
  _require24BitRgb(metadata, 'Feature graphic');
}

void validatePhoneScreenshots(List<Uint8List> screenshots) {
  if (screenshots.length < _minimumPhoneScreenshotCount ||
      screenshots.length > _maximumPhoneScreenshotCount) {
    throw const FormatException(
      'Provide between 4 and 8 phone screenshots for store visibility.',
    );
  }

  for (final screenshot in screenshots) {
    final metadata = readPngMetadata(screenshot);
    _require24BitRgb(metadata, 'Phone screenshot');
    final shortest = metadata.width < metadata.height
        ? metadata.width
        : metadata.height;
    final longest = metadata.width > metadata.height
        ? metadata.width
        : metadata.height;
    if (shortest < _minimumScreenshotDimension ||
        longest > _maximumScreenshotDimension) {
      throw const FormatException(
        'Phone screenshot dimensions must be between 320 and 3840 pixels.',
      );
    }
    if (longest > shortest * 2) {
      throw const FormatException(
        'A phone screenshot edge must not exceed twice its shortest edge.',
      );
    }
  }
}

void validateGraphicAltText({
  required Map<String, dynamic> json,
  required Set<String> screenshotFileNames,
}) {
  _validateAltText('featureGraphic', json['featureGraphic']);
  final screenshots = json['phoneScreenshots'];
  if (screenshots is! Map<String, dynamic>) {
    throw const FormatException('phoneScreenshots alt text must be an object.');
  }
  if (screenshots.keys.toSet().difference(screenshotFileNames).isNotEmpty ||
      screenshotFileNames.difference(screenshots.keys.toSet()).isNotEmpty) {
    throw const FormatException(
      'Screenshot alt text must match the committed screenshot files.',
    );
  }
  for (final entry in screenshots.entries) {
    _validateAltText('phoneScreenshots.${entry.key}', entry.value);
  }
}

void _require24BitRgb(PngMetadata metadata, String assetName) {
  if (!metadata.is24BitRgb) {
    throw FormatException('$assetName must be a 24-bit PNG without alpha.');
  }
}

void _validateAltText(String name, Object? value) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$name alt text must be a non-empty string.');
  }
  if (value.runes.length > _maximumAltTextLength) {
    throw FormatException('$name alt text exceeds 140 characters.');
  }
}

void _validateSingleLine({
  required String name,
  required String value,
  required int maximumLength,
}) {
  if (value.contains(RegExp(r'[\r\n]'))) {
    throw FormatException('$name must be a single line.');
  }
  if (value.runes.length > maximumLength) {
    throw FormatException('$name exceeds its $maximumLength-character limit.');
  }
}

void main() {
  try {
    final listingFile = File('store/google-play/listing-en-US.json');
    final listingJson = jsonDecode(listingFile.readAsStringSync());
    if (listingJson is! Map<String, dynamic>) {
      throw const FormatException('Google Play listing must be a JSON object.');
    }
    validateGooglePlayListing(GooglePlayListing.fromJson(listingJson));

    final iconFile = File('assets/icons/launcher/queuewise_app_icon.png');
    validateLauncherIconSource(iconFile.readAsBytesSync());

    final graphicsDirectory = Directory('store/google-play/graphics');
    final playIconFile = File('${graphicsDirectory.path}/app-icon.png');
    final featureGraphicFile = File(
      '${graphicsDirectory.path}/feature-graphic.png',
    );
    validatePlayIcon(playIconFile.readAsBytesSync());
    validateFeatureGraphic(featureGraphicFile.readAsBytesSync());

    final screenshotDirectory = Directory(
      '${graphicsDirectory.path}/phone-screenshots',
    );
    final screenshotFiles =
        screenshotDirectory
            .listSync()
            .whereType<File>()
            .where((file) => file.path.toLowerCase().endsWith('.png'))
            .toList()
          ..sort((left, right) => left.path.compareTo(right.path));
    validatePhoneScreenshots(
      screenshotFiles.map((file) => file.readAsBytesSync()).toList(),
    );

    final altTextJson = jsonDecode(
      File('${graphicsDirectory.path}/alt-text-en-US.json').readAsStringSync(),
    );
    if (altTextJson is! Map<String, dynamic>) {
      throw const FormatException('Graphic alt text must be a JSON object.');
    }
    validateGraphicAltText(
      json: altTextJson,
      screenshotFileNames: screenshotFiles
          .map((file) => file.uri.pathSegments.last)
          .toSet(),
    );
    stdout.writeln('Google Play listing and graphics are valid.');
  } on Object catch (error) {
    stderr.writeln('Google Play asset validation failed: $error');
    exitCode = 64;
  }
}
