import 'package:flutter_test/flutter_test.dart';
import 'package:queuewise/core/routing/customer_shell_screen.dart';

void main() {
  test('My Queue always resets to its branch root', () {
    expect(
      shouldResetCustomerBranch(
        selectedIndex: customerMyQueueBranchIndex,
        currentIndex: 0,
      ),
      isTrue,
    );
  });

  test('reselecting another active branch resets that branch', () {
    expect(
      shouldResetCustomerBranch(selectedIndex: 1, currentIndex: 1),
      isTrue,
    );
  });

  test('switching to another branch preserves its nested state', () {
    expect(
      shouldResetCustomerBranch(selectedIndex: 4, currentIndex: 0),
      isFalse,
    );
  });
}
