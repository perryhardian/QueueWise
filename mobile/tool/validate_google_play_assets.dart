import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

const _maximumAppNameLength = 30;
const _maximumShortDescriptionLength = 80;
const _maximumFullDescriptionLength = 4000;
const _minimumLauncherSourceSize = 512;

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
  const pngSignature = <int>[137, 80, 78, 71, 13, 10, 26, 10];
  final hasPngSignature =
      bytes.length >= pngSignature.length &&
      List.generate(
        pngSignature.length,
        (index) => bytes[index] == pngSignature[index],
      ).every((matches) => matches);
  if (bytes.length < 24 || !hasPngSignature) {
    throw const FormatException('Launcher icon source must be a valid PNG.');
  }

  final data = ByteData.sublistView(bytes);
  final chunkType = ascii.decode(bytes.sublist(12, 16));
  if (chunkType != 'IHDR') {
    throw const FormatException('Launcher icon PNG is missing its IHDR chunk.');
  }
  return PngDimensions(data.getUint32(16), data.getUint32(20));
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
    stdout.writeln('Google Play listing and launcher source are valid.');
  } on Object catch (error) {
    stderr.writeln('Google Play asset validation failed: $error');
    exitCode = 64;
  }
}
