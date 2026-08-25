class QueueBusinessRef {
  const QueueBusinessRef({required this.id, required this.name, required this.address});
  final String id;
  final String name;
  final String address;
}

class ActiveQueueEntry {
  const ActiveQueueEntry({
    required this.id,
    required this.queueId,
    required this.queueNumber,
    required this.sequenceNumber,
    required this.source,
    required this.status,
    required this.peopleAhead,
    required this.estimatedWaitingTimeMinutes,
    this.nowServing,
    this.checkedInAt,
    this.business,
  });

  final String id;
  final String queueId;
  final String queueNumber;
  final int sequenceNumber;
  final String source;
  final String status;
  final String? nowServing;
  final DateTime? checkedInAt;
  final int peopleAhead;
  final int estimatedWaitingTimeMinutes;
  final QueueBusinessRef? business;
}
