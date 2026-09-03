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

  test('accepts compliant Play graphics', () {
    expect(
      () => validatePlayIcon(_pngHeader(width: 512, height: 512, colorType: 6)),
      returnsNormally,
    );
    expect(
      () => validateFeatureGraphic(_pngHeader(width: 1024, height: 500)),
      returnsNormally,
    );
    expect(
      () => validatePhoneScreenshots(
        List.generate(4, (_) => _pngHeader(width: 1080, height: 1920)),
      ),
      returnsNormally,
    );
  });

  test('rejects invalid Play graphic formats and dimensions', () {
    expect(
      () => validatePlayIcon(_pngHeader(width: 512, height: 512)),
      throwsFormatException,
    );
    expect(
      () => validateFeatureGraphic(
        _pngHeader(width: 1024, height: 500, colorType: 6),
      ),
      throwsFormatException,
    );
    expect(
      () => validatePhoneScreenshots(
        List.generate(4, (_) => _pngHeader(width: 1080, height: 2400)),
      ),
      throwsFormatException,
    );
  });

  test('requires complete, concise graphic alt text', () {
    expect(
      () => validateGraphicAltText(
        json: const <String, dynamic>{
          'featureGraphic': 'QueueWise queue status illustration.',
          'phoneScreenshots': <String, dynamic>{
            '01-home.png': 'QueueWise customer home screen.',
          },
        },
        screenshotFileNames: const {'01-home.png'},
      ),
      returnsNormally,
    );
    expect(
      () => validateGraphicAltText(
        json: const <String, dynamic>{
          'featureGraphic': '',
          'phoneScreenshots': <String, dynamic>{},
        },
        screenshotFileNames: const {'01-home.png'},
      ),
      throwsFormatException,
    );
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

Uint8List _pngHeader({
  required int width,
  required int height,
  int colorType = 2,
}) {
  final bytes = Uint8List(26);
  bytes.setRange(0, 8, const <int>[137, 80, 78, 71, 13, 10, 26, 10]);
  bytes.setRange(12, 16, ascii.encode('IHDR'));
  final data = ByteData.sublistView(bytes);
  data.setUint32(16, width);
  data.setUint32(20, height);
  bytes[24] = 8;
  bytes[25] = colorType;
  return bytes;
}
