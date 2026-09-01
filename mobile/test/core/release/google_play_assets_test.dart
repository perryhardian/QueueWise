import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';

import '../../../tool/validate_google_play_assets.dart';

void main() {
  test('accepts listing metadata within Google Play limits', () {
    expect(
      () => validateGooglePlayListing(
        const GooglePlayListing(
          appName: 'QueueWise',
          shortDescription: 'Join queues remotely.',
          fullDescription: 'Spend less time waiting.',
        ),
      ),
      returnsNormally,
    );
  });

  test('rejects oversized or multiline short listing fields', () {
    expect(
      () => validateGooglePlayListing(
        GooglePlayListing(
          appName: 'QueueWise\nBeta',
          shortDescription: 'a' * 81,
          fullDescription: 'Description',
        ),
      ),
      throwsFormatException,
    );
  });

  test('rejects an oversized full description', () {
    expect(
      () => validateGooglePlayListing(
        GooglePlayListing(
          appName: 'QueueWise',
          shortDescription: 'Join queues remotely.',
          fullDescription: 'a' * 4001,
        ),
      ),
      throwsFormatException,
    );
  });

  test('reads dimensions from a PNG IHDR header', () {
    final dimensions = readPngDimensions(_pngHeader(width: 1024, height: 1024));

    expect(dimensions.width, 1024);
    expect(dimensions.height, 1024);
  });

  test('rejects non-square and undersized launcher sources', () {
    expect(
      () => validateLauncherIconSource(_pngHeader(width: 512, height: 256)),
      throwsFormatException,
    );
    expect(
      () => validateLauncherIconSource(_pngHeader(width: 256, height: 256)),
      throwsFormatException,
    );
  });
}

Uint8List _pngHeader({required int width, required int height}) {
  final bytes = Uint8List(24);
  bytes.setRange(0, 8, const <int>[137, 80, 78, 71, 13, 10, 26, 10]);
  bytes.setRange(12, 16, ascii.encode('IHDR'));
  final data = ByteData.sublistView(bytes);
  data.setUint32(16, width);
  data.setUint32(20, height);
  return bytes;
}
