class MerchantBusinessBrief {
  const MerchantBusinessBrief({
    required this.id,
    required this.name,
    required this.address,
  });

  final String id;
  final String name;
  final String address;
}

class MerchantQueueInfo {
  const MerchantQueueInfo({
    required this.id,
    required this.businessId,
    required this.status,
    this.openedAt,
    this.closedAt,
  });

  final String id;
  final String businessId;
  final String status;
  final DateTime? openedAt;
  final DateTime? closedAt;
}

class MerchantQueueEntry {
  const MerchantQueueEntry({
    required this.id,
    required this.queueId,
    required this.queueNumber,
    required this.sequenceNumber,
    required this.source,
    required this.status,
    required this.joinedAt,
    this.checkedInAt,
    this.calledAt,
    this.serviceStartedAt,
    this.completedAt,
    this.cancelledAt,
    this.noShowAt,
  });

  final String id;
  final String queueId;
  final String queueNumber;
  final int sequenceNumber;
  final String source;
  final String status;
  final DateTime joinedAt;
  final DateTime? checkedInAt;
  final DateTime? calledAt;
  final DateTime? serviceStartedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final DateTime? noShowAt;

  bool get canCall => status == 'WAITING' || status == 'CHECKED_IN';
  bool get canStart => status == 'CALLED';
  bool get canComplete => status == 'SERVING';
  bool get canNoShow =>
      status == 'WAITING' || status == 'CHECKED_IN' || status == 'CALLED';
}

class MerchantQueueOverview {
  const MerchantQueueOverview({required this.queue, required this.business});

  final MerchantQueueInfo queue;
  final MerchantBusinessBrief business;
}

class MerchantQueueDashboard {
  const MerchantQueueDashboard({
    required this.queue,
    required this.business,
    required this.waitingCount,
    required this.checkedInCount,
    required this.completedCount,
    required this.averageServiceTimeMinutes,
    required this.estimatedWaitingTimeMinutes,
    required this.entries,
    this.nowServing,
  });

  final MerchantQueueInfo queue;
  final MerchantBusinessBrief business;
  final String? nowServing;
  final int waitingCount;
  final int checkedInCount;
  final int completedCount;
  final int averageServiceTimeMinutes;
  final int estimatedWaitingTimeMinutes;
  final List<MerchantQueueEntry> entries;
}

class MerchantAnalyticsDay {
  const MerchantAnalyticsDay({
    required this.date,
    required this.completedCount,
    required this.cancelledCount,
    required this.noShowCount,
  });

  final DateTime date;
  final int completedCount;
  final int cancelledCount;
  final int noShowCount;

  int get total => completedCount + cancelledCount + noShowCount;
}

class MerchantAnalytics {
  const MerchantAnalytics({
    required this.businessId,
    required this.windowDays,
    required this.totalHistoryCount,
    required this.completedCount,
    required this.cancelledCount,
    required this.noShowCount,
    required this.averageWaitingMinutes,
    required this.averageServiceMinutes,
    required this.recentDays,
  });

  final String businessId;
  final int windowDays;
  final int totalHistoryCount;
  final int completedCount;
  final int cancelledCount;
  final int noShowCount;
  final int averageWaitingMinutes;
  final int averageServiceMinutes;
  final List<MerchantAnalyticsDay> recentDays;
}
