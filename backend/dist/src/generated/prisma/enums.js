"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.QueueEntryStatus = exports.QueueEntrySource = exports.QueueStatus = exports.Role = void 0;
exports.Role = {
    CUSTOMER: 'CUSTOMER',
    MERCHANT: 'MERCHANT',
    ADMIN: 'ADMIN'
};
exports.QueueStatus = {
    OPEN: 'OPEN',
    PAUSED: 'PAUSED',
    CLOSED: 'CLOSED'
};
exports.QueueEntrySource = {
    ONLINE: 'ONLINE',
    WALK_IN: 'WALK_IN'
};
exports.QueueEntryStatus = {
    WAITING: 'WAITING',
    CHECKED_IN: 'CHECKED_IN',
    CALLED: 'CALLED',
    SERVING: 'SERVING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    NO_SHOW: 'NO_SHOW'
};
exports.NotificationType = {
    QUEUE_GETTING_CLOSE: 'QUEUE_GETTING_CLOSE',
    CUSTOMER_CALLED: 'CUSTOMER_CALLED',
    QUEUE_UPDATED: 'QUEUE_UPDATED'
};
//# sourceMappingURL=enums.js.map