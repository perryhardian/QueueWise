"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AuthSessionScalarFieldEnum = exports.QueueHistoryScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.DeviceTokenScalarFieldEnum = exports.QueueEntryScalarFieldEnum = exports.QueueScalarFieldEnum = exports.ServiceScalarFieldEnum = exports.BusinessScalarFieldEnum = exports.BusinessCategoryScalarFieldEnum = exports.MerchantScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Merchant: 'Merchant',
    BusinessCategory: 'BusinessCategory',
    Business: 'Business',
    Service: 'Service',
    Queue: 'Queue',
    QueueEntry: 'QueueEntry',
    DeviceToken: 'DeviceToken',
    Notification: 'Notification',
    QueueHistory: 'QueueHistory',
    AuthSession: 'AuthSession'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MerchantScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    displayName: 'displayName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BusinessCategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BusinessScalarFieldEnum = {
    id: 'id',
    merchantId: 'merchantId',
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    openingHours: 'openingHours',
    rating: 'rating',
    qrCodeToken: 'qrCodeToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ServiceScalarFieldEnum = {
    id: 'id',
    businessId: 'businessId',
    name: 'name',
    estimatedDurationMinutes: 'estimatedDurationMinutes',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QueueScalarFieldEnum = {
    id: 'id',
    businessId: 'businessId',
    status: 'status',
    currentNumber: 'currentNumber',
    nextSequence: 'nextSequence',
    averageServiceTimeMinutes: 'averageServiceTimeMinutes',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.QueueEntryScalarFieldEnum = {
    id: 'id',
    queueId: 'queueId',
    userId: 'userId',
    queueNumber: 'queueNumber',
    sequenceNumber: 'sequenceNumber',
    source: 'source',
    status: 'status',
    joinedAt: 'joinedAt',
    checkedInAt: 'checkedInAt',
    calledAt: 'calledAt',
    serviceStartedAt: 'serviceStartedAt',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt',
    noShowAt: 'noShowAt'
};
exports.DeviceTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    platform: 'platform',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    queueEntryId: 'queueEntryId',
    type: 'type',
    title: 'title',
    body: 'body',
    sentAt: 'sentAt'
};
exports.QueueHistoryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    businessId: 'businessId',
    queueEntryId: 'queueEntryId',
    queueNumber: 'queueNumber',
    finalStatus: 'finalStatus',
    joinedAt: 'joinedAt',
    completedAt: 'completedAt',
    waitingMinutes: 'waitingMinutes',
    serviceMinutes: 'serviceMinutes',
    createdAt: 'createdAt'
};
exports.AuthSessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    refreshTokenHash: 'refreshTokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map