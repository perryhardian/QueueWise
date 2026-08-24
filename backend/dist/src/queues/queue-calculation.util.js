"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeQueueEntryStatuses = void 0;
exports.formatQueueNumber = formatQueueNumber;
exports.estimateWaitMinutes = estimateWaitMinutes;
const enums_1 = require("../generated/prisma/enums");
exports.activeQueueEntryStatuses = [
    enums_1.QueueEntryStatus.WAITING,
    enums_1.QueueEntryStatus.CHECKED_IN,
    enums_1.QueueEntryStatus.CALLED,
    enums_1.QueueEntryStatus.SERVING,
];
function formatQueueNumber(sequenceNumber, prefix = 'A') {
    return `${prefix}${String(sequenceNumber).padStart(3, '0')}`;
}
function estimateWaitMinutes(peopleAhead, averageServiceTimeMinutes) {
    return peopleAhead * averageServiceTimeMinutes;
}
//# sourceMappingURL=queue-calculation.util.js.map