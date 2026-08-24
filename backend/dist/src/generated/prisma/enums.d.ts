export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly MERCHANT: "MERCHANT";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const QueueStatus: {
    readonly OPEN: "OPEN";
    readonly PAUSED: "PAUSED";
    readonly CLOSED: "CLOSED";
};
export type QueueStatus = (typeof QueueStatus)[keyof typeof QueueStatus];
export declare const QueueEntrySource: {
    readonly ONLINE: "ONLINE";
    readonly WALK_IN: "WALK_IN";
};
export type QueueEntrySource = (typeof QueueEntrySource)[keyof typeof QueueEntrySource];
export declare const QueueEntryStatus: {
    readonly WAITING: "WAITING";
    readonly CHECKED_IN: "CHECKED_IN";
    readonly CALLED: "CALLED";
    readonly SERVING: "SERVING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly NO_SHOW: "NO_SHOW";
};
export type QueueEntryStatus = (typeof QueueEntryStatus)[keyof typeof QueueEntryStatus];
export declare const NotificationType: {
    readonly QUEUE_GETTING_CLOSE: "QUEUE_GETTING_CLOSE";
    readonly CUSTOMER_CALLED: "CUSTOMER_CALLED";
    readonly QUEUE_UPDATED: "QUEUE_UPDATED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
