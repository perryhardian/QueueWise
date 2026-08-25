import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/features/merchant/data/models/merchant_queue_dashboard_model.dart';

void main() {
  test('parses merchant analytics summary and recent days', () {
    final analytics = MerchantAnalyticsModel.fromJson({
      'businessId': 'business-1',
      'windowDays': 7,
      'totalHistoryCount': 3,
      'completedCount': 1,
      'cancelledCount': 1,
      'noShowCount': 1,
      'averageWaitingMinutes': 12,
      'averageServiceMinutes': 8,
      'recentDays': [
        {
          'date': '2026-08-24',
          'completedCount': 0,
          'cancelledCount': 1,
          'noShowCount': 0,
        },
        {
          'date': '2026-08-25',
          'completedCount': 1,
          'cancelledCount': 0,
          'noShowCount': 1,
        },
      ],
    });

    expect(analytics.businessId, 'business-1');
    expect(analytics.totalHistoryCount, 3);
    expect(analytics.averageWaitingMinutes, 12);
    expect(analytics.recentDays.last.total, 2);
  });
}
