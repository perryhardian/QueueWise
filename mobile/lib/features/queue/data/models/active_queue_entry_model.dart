import '../../domain/entities/active_queue_entry.dart';

class QueueBusinessRefModel extends QueueBusinessRef {
  const QueueBusinessRefModel({required super.id, required super.name, required super.address});

  factory QueueBusinessRefModel.fromJson(Map<String, dynamic> json) {
    return QueueBusinessRefModel(
      id: json['id'] as String,
      name: json['name'] as String,
      address: json['address'] as String,
    );
  }
}

class ActiveQueueEntryModel extends ActiveQueueEntry {
  const ActiveQueueEntryModel({required super.id, required super.queueId, required super.queueNumber, required super.sequenceNumber, required super.source, required super.status, required super.peopleAhead, required super.estimatedWaitingTimeMinutes, super.nowServing, super.checkedInAt, super.business});

  factory ActiveQueueEntryModel.fromJson(Map<String, dynamic> json) {
    final businessJson = json['business'];
    return ActiveQueueEntryModel(
      id: json['id'] as String,
      queueId: json['queueId'] as String,
      queueNumber: json['queueNumber'] as String,
      sequenceNumber: (json['sequenceNumber'] as num).toInt(),
      source: json['source'] as String,
      status: json['status'] as String,
      nowServing: json['nowServing'] as String?,
      checkedInAt: json['checkedInAt'] == null ? null : DateTime.parse(json['checkedInAt'] as String),
      peopleAhead: (json['peopleAhead'] as num).toInt(),
      estimatedWaitingTimeMinutes: (json['estimatedWaitingTimeMinutes'] as num).toInt(),
      business: businessJson == null ? null : QueueBusinessRefModel.fromJson(businessJson as Map<String, dynamic>),
    );
  }
}
