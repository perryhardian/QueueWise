import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

import '../../features/auth/data/datasources/auth_local_data_source.dart';
import '../network/api_config.dart';

final queueRealtimeServiceProvider = Provider<QueueRealtimeService>((ref) {
  final service = QueueRealtimeService(ref.watch(authLocalDataSourceProvider));
  ref.onDispose(service.dispose);
  return service;
});

class QueueRealtimeEvent {
  const QueueRealtimeEvent({required this.name, required this.queueId, this.businessId, this.entryId});

  final String name;
  final String queueId;
  final String? businessId;
  final String? entryId;

  factory QueueRealtimeEvent.fromSocket(String name, Object? data) {
    final payload = data is Map ? data : const {};
    return QueueRealtimeEvent(
      name: name,
      queueId: payload['queueId'] as String? ?? '',
      businessId: payload['businessId'] as String?,
      entryId: payload['entryId'] as String?,
    );
  }
}

class QueueRealtimeService {
  QueueRealtimeService(this._authLocalDataSource);

  final AuthLocalDataSource _authLocalDataSource;
  final _eventsController = StreamController<QueueRealtimeEvent>.broadcast();
  io.Socket? _socket;
  String? _activeQueueId;
  String? _activeBusinessId;

  Stream<QueueRealtimeEvent> get events => _eventsController.stream;

  Future<void> connect() async {
    final existingSocket = _socket;
    if (existingSocket?.connected == true) return;

    final token = await _authLocalDataSource.readAccessToken();
    if (token == null || token.isEmpty) return;

    final socket = io.io(
      ApiConfig.socketUrl,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .setAuth({'token': token})
          .build(),
    );
    _socket = socket;

    for (final eventName in _queueEventNames) {
      socket.on(eventName, (data) => _eventsController.add(QueueRealtimeEvent.fromSocket(eventName, data)));
    }

    socket.onConnect((_) {
      final queueId = _activeQueueId;
      final businessId = _activeBusinessId;
      if (queueId != null) subscribeQueue(queueId);
      if (businessId != null) subscribeBusiness(businessId);
    });

    socket.connect();
  }

  void subscribeQueue(String queueId) {
    _activeQueueId = queueId;
    final socket = _socket;
    if (socket?.connected == true) {
      socket!.emit('queue.subscribe', {'queueId': queueId});
    }
  }

  void subscribeBusiness(String businessId) {
    _activeBusinessId = businessId;
    final socket = _socket;
    if (socket?.connected == true) {
      socket!.emit('business.subscribe', {'businessId': businessId});
    }
  }

  void dispose() {
    _socket?.dispose();
    _socket = null;
    _eventsController.close();
  }
}

const _queueEventNames = [
  'queue.joined',
  'queue.checked_in',
  'queue.called',
  'queue.serving',
  'queue.completed',
  'queue.cancelled',
  'queue.no_show',
  'queue.updated',
];
