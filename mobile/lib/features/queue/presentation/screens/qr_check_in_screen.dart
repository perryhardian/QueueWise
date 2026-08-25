import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import '../../../../shared/widgets/state_views.dart';
import '../controllers/active_queue_controller.dart';

class QrCheckInScreen extends ConsumerStatefulWidget {
  const QrCheckInScreen({super.key});

  @override
  ConsumerState<QrCheckInScreen> createState() => _QrCheckInScreenState();
}

class _QrCheckInScreenState extends ConsumerState<QrCheckInScreen> {
  final _scannerController = MobileScannerController();
  final _manualTokenController = TextEditingController();
  bool _submitting = false;
  String? _errorMessage;
  String? _lastScannedValue;

  @override
  void dispose() {
    _scannerController.dispose();
    _manualTokenController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final activeQueueState = ref.watch(activeQueueControllerProvider);
    final activeEntry = activeQueueState.valueOrNull;

    return Scaffold(
      appBar: AppBar(title: const Text('QR Check-in')),
      body: SafeArea(
        child: activeQueueState.when(
          data: (entry) {
            if (entry == null) {
              return EmptyStateView(
                title: 'No active queue',
                message: 'Join a queue before scanning a check-in QR.',
                icon: Icons.qr_code_scanner,
              );
            }

            return ListView(
              padding: const EdgeInsets.all(16),
              children: [
                if (activeEntry != null) ...[
                  Text(
                    activeEntry.business?.name ?? 'Active queue',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 4),
                  Text('Queue number ${activeEntry.queueNumber}'),
                  const SizedBox(height: 16),
                ],
                AspectRatio(
                  aspectRatio: 1,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        MobileScanner(
                          controller: _scannerController,
                          onDetect: _submitting ? null : _handleScan,
                        ),
                        Center(
                          child: Container(
                            width: 220,
                            height: 220,
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: colorScheme.primary,
                                width: 3,
                              ),
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                        ),
                        if (_submitting)
                          ColoredBox(
                            color: Colors.black45,
                            child: Center(
                              child: CircularProgressIndicator(
                                color: colorScheme.onPrimary,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  'Scan the check-in QR displayed at the business counter.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _manualTokenController,
                  enabled: !_submitting,
                  textInputAction: TextInputAction.done,
                  decoration: InputDecoration(
                    labelText: 'Manual QR code',
                    helperText:
                        'Use this when testing without a camera QR image.',
                    prefixIcon: const Icon(Icons.pin_outlined),
                    errorText: _errorMessage,
                  ),
                  onSubmitted: _submitManualToken,
                ),
                const SizedBox(height: 12),
                FilledButton.icon(
                  onPressed: _submitting
                      ? null
                      : () => _submitManualToken(_manualTokenController.text),
                  icon: const Icon(Icons.fact_check_outlined),
                  label: const Text('Confirm Check-in'),
                ),
              ],
            );
          },
          loading: () => const LoadingStateView(),
          error: (_, _) => ErrorStateView(
            message: 'Unable to load your active queue.',
            onRetry: () => ref.invalidate(activeQueueControllerProvider),
          ),
        ),
      ),
    );
  }

  void _handleScan(BarcodeCapture capture) {
    final rawValue = capture.barcodes.firstOrNull?.rawValue;
    if (rawValue == null || rawValue == _lastScannedValue) return;
    _lastScannedValue = rawValue;
    _submitToken(rawValue);
  }

  void _submitManualToken(String value) {
    _submitToken(value);
  }

  Future<void> _submitToken(String rawValue) async {
    final token = _extractToken(rawValue);
    if (token.isEmpty) {
      setState(() => _errorMessage = 'Enter or scan a valid check-in QR code.');
      return;
    }

    setState(() {
      _submitting = true;
      _errorMessage = null;
    });

    try {
      await ref.read(activeQueueControllerProvider.notifier).checkIn(token);
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('You are checked in.')));
      context.go('/my-queue');
    } catch (error) {
      if (!mounted) return;
      setState(() {
        _submitting = false;
        _errorMessage = _friendlyError(error);
        _lastScannedValue = null;
      });
    }
  }

  String _extractToken(String rawValue) {
    final value = rawValue.trim();
    if (value.isEmpty) return '';
    final uri = Uri.tryParse(value);
    if (uri != null) {
      final token =
          uri.queryParameters['qrCodeToken'] ?? uri.queryParameters['token'];
      if (token != null && token.trim().isNotEmpty) return token.trim();
    }
    return value;
  }

  String _friendlyError(Object error) {
    if (error is DioException) {
      final data = error.response?.data;
      if (data is Map && data['message'] is String)
        return data['message'] as String;
      return 'Unable to check in. Check your connection and try again.';
    }
    return 'Unable to check in. Please try again.';
  }
}
