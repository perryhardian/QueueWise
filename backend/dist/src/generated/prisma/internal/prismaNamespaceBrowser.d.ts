import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Merchant: "Merchant";
    readonly BusinessCategory: "BusinessCategory";
    readonly Business: "Business";
    readonly Service: "Service";
    readonly Queue: "Queue";
    readonly QueueEntry: "QueueEntry";
    readonly DeviceToken: "DeviceToken";
    readonly Notification: "Notification";
    readonly QueueHistory: "QueueHistory";
    readonly AuthSession: "AuthSession";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const MerchantScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly displayName: "displayName";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MerchantScalarFieldEnum = (typeof MerchantScalarFieldEnum)[keyof typeof MerchantScalarFieldEnum];
export declare const BusinessCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BusinessCategoryScalarFieldEnum = (typeof BusinessCategoryScalarFieldEnum)[keyof typeof BusinessCategoryScalarFieldEnum];
export declare const BusinessScalarFieldEnum: {
    readonly id: "id";
    readonly merchantId: "merchantId";
    readonly categoryId: "categoryId";
    readonly name: "name";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly openingHours: "openingHours";
    readonly rating: "rating";
    readonly qrCodeToken: "qrCodeToken";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum];
export declare const ServiceScalarFieldEnum: {
    readonly id: "id";
    readonly businessId: "businessId";
    readonly name: "name";
    readonly estimatedDurationMinutes: "estimatedDurationMinutes";
    readonly price: "price";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum];
export declare const QueueScalarFieldEnum: {
    readonly id: "id";
    readonly businessId: "businessId";
    readonly status: "status";
    readonly currentNumber: "currentNumber";
    readonly nextSequence: "nextSequence";
    readonly averageServiceTimeMinutes: "averageServiceTimeMinutes";
    readonly openedAt: "openedAt";
    readonly closedAt: "closedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type QueueScalarFieldEnum = (typeof QueueScalarFieldEnum)[keyof typeof QueueScalarFieldEnum];
export declare const QueueEntryScalarFieldEnum: {
    readonly id: "id";
    readonly queueId: "queueId";
    readonly userId: "userId";
    readonly queueNumber: "queueNumber";
    readonly sequenceNumber: "sequenceNumber";
    readonly source: "source";
    readonly status: "status";
    readonly joinedAt: "joinedAt";
    readonly checkedInAt: "checkedInAt";
    readonly calledAt: "calledAt";
    readonly serviceStartedAt: "serviceStartedAt";
    readonly completedAt: "completedAt";
    readonly cancelledAt: "cancelledAt";
    readonly noShowAt: "noShowAt";
};
export type QueueEntryScalarFieldEnum = (typeof QueueEntryScalarFieldEnum)[keyof typeof QueueEntryScalarFieldEnum];
export declare const DeviceTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly platform: "platform";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DeviceTokenScalarFieldEnum = (typeof DeviceTokenScalarFieldEnum)[keyof typeof DeviceTokenScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly queueEntryId: "queueEntryId";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly sentAt: "sentAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const QueueHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly businessId: "businessId";
    readonly queueEntryId: "queueEntryId";
    readonly queueNumber: "queueNumber";
    readonly finalStatus: "finalStatus";
    readonly joinedAt: "joinedAt";
    readonly completedAt: "completedAt";
    readonly waitingMinutes: "waitingMinutes";
    readonly serviceMinutes: "serviceMinutes";
    readonly createdAt: "createdAt";
};
export type QueueHistoryScalarFieldEnum = (typeof QueueHistoryScalarFieldEnum)[keyof typeof QueueHistoryScalarFieldEnum];
export declare const AuthSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AuthSessionScalarFieldEnum = (typeof AuthSessionScalarFieldEnum)[keyof typeof AuthSessionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
