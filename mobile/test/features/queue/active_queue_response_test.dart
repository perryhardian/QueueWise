import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/queue/data/datasources/queue_remote_data_source.dart';

void main() {
  group('parseActiveQueueEntryResponse', () {
    test('treats a missing response body as no active queue', () {
      expect(parseActiveQueueEntryResponse(null), isNull);
      expect(parseActiveQueueEntryResponse(''), isNull);
      expect(parseActiveQueueEntryResponse('   '), isNull);
    });

    test('parses an active queue payload', () {
      final entry = parseActiveQueueEntryResponse({
        'id': 'entry-1',
        'queueId': 'queue-1',
        'queueNumber': 'A004',
        'sequenceNumber': 4,
        'source': 'ONLINE',
        'status': 'WAITING',
        'nowServing': 'A012',
        'checkedInAt': null,
        'peopleAhead': 3,
        'estimatedWaitingTimeMinutes': 30,
        'business': {
          'id': 'business-1',
          'name': 'ABC Barbershop',
          'address': 'Jl. Kemang Raya No. 12, Jakarta',
        },
      });

      expect(entry, isNotNull);
      expect(entry!.queueNumber, 'A004');
      expect(entry.peopleAhead, 3);
      expect(entry.business?.name, 'ABC Barbershop');
    });

    test('rejects an unexpected response shape', () {
      expect(
        () => parseActiveQueueEntryResponse(<Object>[]),
        throwsFormatException,
      );
    });
  });
}
