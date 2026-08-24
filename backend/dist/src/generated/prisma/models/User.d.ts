import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
    passwordHash: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
    passwordHash: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    fullName: number;
    email: number;
    phoneNumber: number;
    passwordHash: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phoneNumber?: true;
    passwordHash?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    passwordHash: string;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    fullName?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    merchant?: Prisma.XOR<Prisma.MerchantNullableScalarRelationFilter, Prisma.MerchantWhereInput> | null;
    queueEntries?: Prisma.QueueEntryListRelationFilter;
    deviceTokens?: Prisma.DeviceTokenListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    histories?: Prisma.QueueHistoryListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    merchant?: Prisma.MerchantOrderByWithRelationInput;
    queueEntries?: Prisma.QueueEntryOrderByRelationAggregateInput;
    deviceTokens?: Prisma.DeviceTokenOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    histories?: Prisma.QueueHistoryOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    fullName?: Prisma.StringFilter<"User"> | string;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    merchant?: Prisma.XOR<Prisma.MerchantNullableScalarRelationFilter, Prisma.MerchantWhereInput> | null;
    queueEntries?: Prisma.QueueEntryListRelationFilter;
    deviceTokens?: Prisma.DeviceTokenListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    histories?: Prisma.QueueHistoryListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phoneNumber?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantUncheckedCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUncheckedUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUncheckedUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutMerchantInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMerchantInput, Prisma.UserUncheckedCreateWithoutMerchantInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMerchantInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutMerchantNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMerchantInput, Prisma.UserUncheckedCreateWithoutMerchantInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMerchantInput;
    upsert?: Prisma.UserUpsertWithoutMerchantInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMerchantInput, Prisma.UserUpdateWithoutMerchantInput>, Prisma.UserUncheckedUpdateWithoutMerchantInput>;
};
export type UserCreateNestedOneWithoutQueueEntriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutQueueEntriesInput, Prisma.UserUncheckedCreateWithoutQueueEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutQueueEntriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutQueueEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutQueueEntriesInput, Prisma.UserUncheckedCreateWithoutQueueEntriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutQueueEntriesInput;
    upsert?: Prisma.UserUpsertWithoutQueueEntriesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutQueueEntriesInput, Prisma.UserUpdateWithoutQueueEntriesInput>, Prisma.UserUncheckedUpdateWithoutQueueEntriesInput>;
};
export type UserCreateNestedOneWithoutDeviceTokensInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeviceTokensInput, Prisma.UserUncheckedCreateWithoutDeviceTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeviceTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDeviceTokensNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeviceTokensInput, Prisma.UserUncheckedCreateWithoutDeviceTokensInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeviceTokensInput;
    upsert?: Prisma.UserUpsertWithoutDeviceTokensInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDeviceTokensInput, Prisma.UserUpdateWithoutDeviceTokensInput>, Prisma.UserUncheckedUpdateWithoutDeviceTokensInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutHistoriesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHistoriesInput, Prisma.UserUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHistoriesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutHistoriesInput, Prisma.UserUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutHistoriesInput;
    upsert?: Prisma.UserUpsertWithoutHistoriesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutHistoriesInput, Prisma.UserUpdateWithoutHistoriesInput>, Prisma.UserUncheckedUpdateWithoutHistoriesInput>;
};
export type UserCreateWithoutMerchantInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    queueEntries?: Prisma.QueueEntryCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutMerchantInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    queueEntries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutMerchantInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMerchantInput, Prisma.UserUncheckedCreateWithoutMerchantInput>;
};
export type UserUpsertWithoutMerchantInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMerchantInput, Prisma.UserUncheckedUpdateWithoutMerchantInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMerchantInput, Prisma.UserUncheckedCreateWithoutMerchantInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMerchantInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMerchantInput, Prisma.UserUncheckedUpdateWithoutMerchantInput>;
};
export type UserUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    queueEntries?: Prisma.QueueEntryUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    queueEntries?: Prisma.QueueEntryUncheckedUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutQueueEntriesInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantCreateNestedOneWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutQueueEntriesInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantUncheckedCreateNestedOneWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutQueueEntriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutQueueEntriesInput, Prisma.UserUncheckedCreateWithoutQueueEntriesInput>;
};
export type UserUpsertWithoutQueueEntriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutQueueEntriesInput, Prisma.UserUncheckedUpdateWithoutQueueEntriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutQueueEntriesInput, Prisma.UserUncheckedCreateWithoutQueueEntriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutQueueEntriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutQueueEntriesInput, Prisma.UserUncheckedUpdateWithoutQueueEntriesInput>;
};
export type UserUpdateWithoutQueueEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutQueueEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUncheckedUpdateOneWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutDeviceTokensInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutDeviceTokensInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantUncheckedCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutDeviceTokensInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeviceTokensInput, Prisma.UserUncheckedCreateWithoutDeviceTokensInput>;
};
export type UserUpsertWithoutDeviceTokensInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDeviceTokensInput, Prisma.UserUncheckedUpdateWithoutDeviceTokensInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeviceTokensInput, Prisma.UserUncheckedCreateWithoutDeviceTokensInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDeviceTokensInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDeviceTokensInput, Prisma.UserUncheckedUpdateWithoutDeviceTokensInput>;
};
export type UserUpdateWithoutDeviceTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutDeviceTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUncheckedUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantUncheckedCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedCreateNestedManyWithoutUserInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUncheckedUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUncheckedUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedUpdateManyWithoutUserNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutHistoriesInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutHistoriesInput = {
    id?: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    passwordHash: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant?: Prisma.MerchantUncheckedCreateNestedOneWithoutUserInput;
    queueEntries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutUserInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutHistoriesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutHistoriesInput, Prisma.UserUncheckedCreateWithoutHistoriesInput>;
};
export type UserUpsertWithoutHistoriesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutHistoriesInput, Prisma.UserUncheckedUpdateWithoutHistoriesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutHistoriesInput, Prisma.UserUncheckedCreateWithoutHistoriesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutHistoriesInput, Prisma.UserUncheckedUpdateWithoutHistoriesInput>;
};
export type UserUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUncheckedUpdateOneWithoutUserNestedInput;
    queueEntries?: Prisma.QueueEntryUncheckedUpdateManyWithoutUserNestedInput;
    deviceTokens?: Prisma.DeviceTokenUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    queueEntries: number;
    deviceTokens: number;
    notifications: number;
    histories: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    queueEntries?: boolean | UserCountOutputTypeCountQueueEntriesArgs;
    deviceTokens?: boolean | UserCountOutputTypeCountDeviceTokensArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    histories?: boolean | UserCountOutputTypeCountHistoriesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountQueueEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueEntryWhereInput;
};
export type UserCountOutputTypeCountDeviceTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceTokenWhereInput;
};
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type UserCountOutputTypeCountHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueHistoryWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    merchant?: boolean | Prisma.User$merchantArgs<ExtArgs>;
    queueEntries?: boolean | Prisma.User$queueEntriesArgs<ExtArgs>;
    deviceTokens?: boolean | Prisma.User$deviceTokensArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    histories?: boolean | Prisma.User$historiesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    passwordHash?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "email" | "phoneNumber" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    merchant?: boolean | Prisma.User$merchantArgs<ExtArgs>;
    queueEntries?: boolean | Prisma.User$queueEntriesArgs<ExtArgs>;
    deviceTokens?: boolean | Prisma.User$deviceTokensArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    histories?: boolean | Prisma.User$historiesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        merchant: Prisma.$MerchantPayload<ExtArgs> | null;
        queueEntries: Prisma.$QueueEntryPayload<ExtArgs>[];
        deviceTokens: Prisma.$DeviceTokenPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        histories: Prisma.$QueueHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string | null;
        passwordHash: string;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    merchant<T extends Prisma.User$merchantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$merchantArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    queueEntries<T extends Prisma.User$queueEntriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$queueEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    deviceTokens<T extends Prisma.User$deviceTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$deviceTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    histories<T extends Prisma.User$historiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly fullName: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$merchantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where?: Prisma.MerchantWhereInput;
};
export type User$queueEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    where?: Prisma.QueueEntryWhereInput;
    orderBy?: Prisma.QueueEntryOrderByWithRelationInput | Prisma.QueueEntryOrderByWithRelationInput[];
    cursor?: Prisma.QueueEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QueueEntryScalarFieldEnum | Prisma.QueueEntryScalarFieldEnum[];
};
export type User$deviceTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceTokenSelect<ExtArgs> | null;
    omit?: Prisma.DeviceTokenOmit<ExtArgs> | null;
    include?: Prisma.DeviceTokenInclude<ExtArgs> | null;
    where?: Prisma.DeviceTokenWhereInput;
    orderBy?: Prisma.DeviceTokenOrderByWithRelationInput | Prisma.DeviceTokenOrderByWithRelationInput[];
    cursor?: Prisma.DeviceTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceTokenScalarFieldEnum | Prisma.DeviceTokenScalarFieldEnum[];
};
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type User$historiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where?: Prisma.QueueHistoryWhereInput;
    orderBy?: Prisma.QueueHistoryOrderByWithRelationInput | Prisma.QueueHistoryOrderByWithRelationInput[];
    cursor?: Prisma.QueueHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QueueHistoryScalarFieldEnum | Prisma.QueueHistoryScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
