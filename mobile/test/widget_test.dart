import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/main.dart';

void main() {
  testWidgets('renders phase 2 setup screen', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: QueueWiseApp()));

    expect(find.text('QueueWise'), findsOneWidget);
    expect(find.text('Phase 2 Setup'), findsOneWidget);
    expect(find.text('Riverpod configured'), findsOneWidget);
  });
}