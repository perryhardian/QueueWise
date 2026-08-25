class QueueHistoryBusiness {
  const QueueHistoryBusiness({
    required this.id,
    required this.name,
    required this.address,
    required this.categoryName,
  });

  final String id;
  final String name;
  final String address;
  final String categoryName;
}

class QueueHistoryItem {
  const QueueHistoryItem({
    required this.id,
    required this.queueEntryId,
    required this.queueNumber,
    required this.finalStatus,
    required this.joinedAt,
    required this.business,
    this.completedAt,
    this.waitingMinutes,
    this.serviceMinutes,
  });

  final String id;
  final String queueEntryId;
  final String queueNumber;
  final String finalStatus;
  final DateTime joinedAt;
  final DateTime? completedAt;
  final int? waitingMinutes;
  final int? serviceMinutes;
  final QueueHistoryBusiness business;
}
