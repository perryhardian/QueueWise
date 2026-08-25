import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/history/data/models/queue_history_item_model.dart';

void main() {
  test('parses queue history item with business category', () {
    final item = QueueHistoryItemModel.fromJson({
      'id': 'history-1',
      'queueEntryId': 'entry-1',
      'queueNumber': 'A001',
      'finalStatus': 'COMPLETED',
      'joinedAt': '2026-08-25T02:00:00.000Z',
      'completedAt': '2026-08-25T02:20:00.000Z',
      'waitingMinutes': 10,
      'serviceMinutes': 8,
      'business': {
        'id': 'business-1',
        'name': 'Queue Cafe',
        'address': 'Jl. Queue 1',
        'category': {'name': 'Cafe'},
      },
    });

    expect(item.queueNumber, 'A001');
    expect(item.finalStatus, 'COMPLETED');
    expect(item.business.name, 'Queue Cafe');
    expect(item.business.categoryName, 'Cafe');
    expect(item.waitingMinutes, 10);
    expect(item.serviceMinutes, 8);
  });
}
