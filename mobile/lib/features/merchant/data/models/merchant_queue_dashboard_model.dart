import '../../domain/entities/merchant_queue_dashboard.dart';

DateTime? _optionalDate(Object? value) => value == null ? null : DateTime.parse(value as String);

class MerchantBusinessBriefModel extends MerchantBusinessBrief {
  const MerchantBusinessBriefModel({required super.id, required super.name, required super.address});

  factory MerchantBusinessBriefModel.fromJson(Map<String, dynamic> json) {
    return MerchantBusinessBriefModel(
      id: json['id'] as String,
      name: json['name'] as String,
      address: json['address'] as String,
    );
  }
}

class MerchantQueueInfoModel extends MerchantQueueInfo {
  const MerchantQueueInfoModel({required super.id, required super.businessId, required super.status, super.openedAt, super.closedAt});

  factory MerchantQueueInfoModel.fromJson(Map<String, dynamic> json) {
    return MerchantQueueInfoModel(
      id: json['id'] as String,
      businessId: json['businessId'] as String,
      status: json['status'] as String,
      openedAt: _optionalDate(json['openedAt']),
      closedAt: _optionalDate(json['closedAt']),
    );
  }
}

class MerchantQueueEntryModel extends MerchantQueueEntry {
  const MerchantQueueEntryModel({
    required super.id,
    required super.queueId,
    required super.queueNumber,
    required super.sequenceNumber,
    required super.source,
    required super.status,
    required super.joinedAt,
    super.checkedInAt,
    super.calledAt,
    super.serviceStartedAt,
    super.completedAt,
    super.cancelledAt,
    super.noShowAt,
  });

  factory MerchantQueueEntryModel.fromJson(Map<String, dynamic> json) {
    return MerchantQueueEntryModel(
      id: json['id'] as String,
      queueId: json['queueId'] as String,
      queueNumber: json['queueNumber'] as String,
      sequenceNumber: json['sequenceNumber'] as int,
      source: json['source'] as String,
      status: json['status'] as String,
      joinedAt: DateTime.parse(json['joinedAt'] as String),
      checkedInAt: _optionalDate(json['checkedInAt']),
      calledAt: _optionalDate(json['calledAt']),
      serviceStartedAt: _optionalDate(json['serviceStartedAt']),
      completedAt: _optionalDate(json['completedAt']),
      cancelledAt: _optionalDate(json['cancelledAt']),
      noShowAt: _optionalDate(json['noShowAt']),
    );
  }
}

class MerchantQueueOverviewModel extends MerchantQueueOverview {
  const MerchantQueueOverviewModel({required super.queue, required super.business});

  factory MerchantQueueOverviewModel.fromJson(Map<String, dynamic> json) {
    return MerchantQueueOverviewModel(
      queue: MerchantQueueInfoModel.fromJson(json['queue'] as Map<String, dynamic>),
      business: MerchantBusinessBriefModel.fromJson(json['business'] as Map<String, dynamic>),
    );
  }
}

class MerchantQueueDashboardModel extends MerchantQueueDashboard {
  const MerchantQueueDashboardModel({
    required super.queue,
    required super.business,
    required super.waitingCount,
    required super.checkedInCount,
    required super.completedCount,
    required super.averageServiceTimeMinutes,
    required super.estimatedWaitingTimeMinutes,
    required super.entries,
    super.nowServing,
  });

  factory MerchantQueueDashboardModel.fromJson(Map<String, dynamic> json) {
    return MerchantQueueDashboardModel(
      queue: MerchantQueueInfoModel.fromJson(json['queue'] as Map<String, dynamic>),
      business: MerchantBusinessBriefModel.fromJson(json['business'] as Map<String, dynamic>),
      nowServing: json['nowServing'] as String?,
      waitingCount: json['waitingCount'] as int,
      checkedInCount: json['checkedInCount'] as int,
      completedCount: json['completedCount'] as int,
      averageServiceTimeMinutes: json['averageServiceTimeMinutes'] as int,
      estimatedWaitingTimeMinutes: json['estimatedWaitingTimeMinutes'] as int,
      entries: (json['entries'] as List<dynamic>).map((entry) => MerchantQueueEntryModel.fromJson(entry as Map<String, dynamic>)).toList(),
    );
  }
}