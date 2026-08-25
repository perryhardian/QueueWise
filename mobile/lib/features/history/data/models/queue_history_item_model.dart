import '../../domain/entities/queue_history_item.dart';

DateTime? _optionalDate(Object? value) =>
    value == null ? null : DateTime.parse(value as String);

class QueueHistoryBusinessModel extends QueueHistoryBusiness {
  const QueueHistoryBusinessModel({
    required super.id,
    required super.name,
    required super.address,
    required super.categoryName,
  });

  factory QueueHistoryBusinessModel.fromJson(Map<String, dynamic> json) {
    final category = json['category'] as Map<String, dynamic>?;
    return QueueHistoryBusinessModel(
      id: json['id'] as String,
      name: json['name'] as String,
      address: json['address'] as String,
      categoryName: category?['name'] as String? ?? 'Business',
    );
  }
}

class QueueHistoryItemModel extends QueueHistoryItem {
  const QueueHistoryItemModel({
    required super.id,
    required super.queueEntryId,
    required super.queueNumber,
    required super.finalStatus,
    required super.joinedAt,
    required super.business,
    super.completedAt,
    super.waitingMinutes,
    super.serviceMinutes,
  });

  factory QueueHistoryItemModel.fromJson(Map<String, dynamic> json) {
    return QueueHistoryItemModel(
      id: json['id'] as String,
      queueEntryId: json['queueEntryId'] as String,
      queueNumber: json['queueNumber'] as String,
      finalStatus: json['finalStatus'] as String,
      joinedAt: DateTime.parse(json['joinedAt'] as String),
      completedAt: _optionalDate(json['completedAt']),
      waitingMinutes: json['waitingMinutes'] as int?,
      serviceMinutes: json['serviceMinutes'] as int?,
      business: QueueHistoryBusinessModel.fromJson(
        json['business'] as Map<String, dynamic>,
      ),
    );
  }
}
