import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QueueHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$QueueHistoryPayload>;
export type AggregateQueueHistory = {
    _count: QueueHistoryCountAggregateOutputType | null;
    _avg: QueueHistoryAvgAggregateOutputType | null;
    _sum: QueueHistorySumAggregateOutputType | null;
    _min: QueueHistoryMinAggregateOutputType | null;
    _max: QueueHistoryMaxAggregateOutputType | null;
};
export type QueueHistoryAvgAggregateOutputType = {
    waitingMinutes: number | null;
    serviceMinutes: number | null;
};
export type QueueHistorySumAggregateOutputType = {
    waitingMinutes: number | null;
    serviceMinutes: number | null;
};
export type QueueHistoryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    businessId: string | null;
    queueEntryId: string | null;
    queueNumber: string | null;
    finalStatus: $Enums.QueueEntryStatus | null;
    joinedAt: Date | null;
    completedAt: Date | null;
    waitingMinutes: number | null;
    serviceMinutes: number | null;
    createdAt: Date | null;
};
export type QueueHistoryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    businessId: string | null;
    queueEntryId: string | null;
    queueNumber: string | null;
    finalStatus: $Enums.QueueEntryStatus | null;
    joinedAt: Date | null;
    completedAt: Date | null;
    waitingMinutes: number | null;
    serviceMinutes: number | null;
    createdAt: Date | null;
};
export type QueueHistoryCountAggregateOutputType = {
    id: number;
    userId: number;
    businessId: number;
    queueEntryId: number;
    queueNumber: number;
    finalStatus: number;
    joinedAt: number;
    completedAt: number;
    waitingMinutes: number;
    serviceMinutes: number;
    createdAt: number;
    _all: number;
};
export type QueueHistoryAvgAggregateInputType = {
    waitingMinutes?: true;
    serviceMinutes?: true;
};
export type QueueHistorySumAggregateInputType = {
    waitingMinutes?: true;
    serviceMinutes?: true;
};
export type QueueHistoryMinAggregateInputType = {
    id?: true;
    userId?: true;
    businessId?: true;
    queueEntryId?: true;
    queueNumber?: true;
    finalStatus?: true;
    joinedAt?: true;
    completedAt?: true;
    waitingMinutes?: true;
    serviceMinutes?: true;
    createdAt?: true;
};
export type QueueHistoryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    businessId?: true;
    queueEntryId?: true;
    queueNumber?: true;
    finalStatus?: true;
    joinedAt?: true;
    completedAt?: true;
    waitingMinutes?: true;
    serviceMinutes?: true;
    createdAt?: true;
};
export type QueueHistoryCountAggregateInputType = {
    id?: true;
    userId?: true;
    businessId?: true;
    queueEntryId?: true;
    queueNumber?: true;
    finalStatus?: true;
    joinedAt?: true;
    completedAt?: true;
    waitingMinutes?: true;
    serviceMinutes?: true;
    createdAt?: true;
    _all?: true;
};
export type QueueHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueHistoryWhereInput;
    orderBy?: Prisma.QueueHistoryOrderByWithRelationInput | Prisma.QueueHistoryOrderByWithRelationInput[];
    cursor?: Prisma.QueueHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QueueHistoryCountAggregateInputType;
    _avg?: QueueHistoryAvgAggregateInputType;
    _sum?: QueueHistorySumAggregateInputType;
    _min?: QueueHistoryMinAggregateInputType;
    _max?: QueueHistoryMaxAggregateInputType;
};
export type GetQueueHistoryAggregateType<T extends QueueHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateQueueHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQueueHistory[P]> : Prisma.GetScalarType<T[P], AggregateQueueHistory[P]>;
};
export type QueueHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueHistoryWhereInput;
    orderBy?: Prisma.QueueHistoryOrderByWithAggregationInput | Prisma.QueueHistoryOrderByWithAggregationInput[];
    by: Prisma.QueueHistoryScalarFieldEnum[] | Prisma.QueueHistoryScalarFieldEnum;
    having?: Prisma.QueueHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QueueHistoryCountAggregateInputType | true;
    _avg?: QueueHistoryAvgAggregateInputType;
    _sum?: QueueHistorySumAggregateInputType;
    _min?: QueueHistoryMinAggregateInputType;
    _max?: QueueHistoryMaxAggregateInputType;
};
export type QueueHistoryGroupByOutputType = {
    id: string;
    userId: string | null;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date;
    completedAt: Date | null;
    waitingMinutes: number | null;
    serviceMinutes: number | null;
    createdAt: Date;
    _count: QueueHistoryCountAggregateOutputType | null;
    _avg: QueueHistoryAvgAggregateOutputType | null;
    _sum: QueueHistorySumAggregateOutputType | null;
    _min: QueueHistoryMinAggregateOutputType | null;
    _max: QueueHistoryMaxAggregateOutputType | null;
};
export type GetQueueHistoryGroupByPayload<T extends QueueHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QueueHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QueueHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QueueHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QueueHistoryGroupByOutputType[P]>;
}>>;
export type QueueHistoryWhereInput = {
    AND?: Prisma.QueueHistoryWhereInput | Prisma.QueueHistoryWhereInput[];
    OR?: Prisma.QueueHistoryWhereInput[];
    NOT?: Prisma.QueueHistoryWhereInput | Prisma.QueueHistoryWhereInput[];
    id?: Prisma.StringFilter<"QueueHistory"> | string;
    userId?: Prisma.StringNullableFilter<"QueueHistory"> | string | null;
    businessId?: Prisma.StringFilter<"QueueHistory"> | string;
    queueEntryId?: Prisma.StringFilter<"QueueHistory"> | string;
    queueNumber?: Prisma.StringFilter<"QueueHistory"> | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFilter<"QueueHistory"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueHistory"> | Date | string | null;
    waitingMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    serviceMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    business?: Prisma.XOR<Prisma.BusinessScalarRelationFilter, Prisma.BusinessWhereInput>;
    queueEntry?: Prisma.XOR<Prisma.QueueEntryScalarRelationFilter, Prisma.QueueEntryWhereInput>;
};
export type QueueHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    queueEntryId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    finalStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    waitingMinutes?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    business?: Prisma.BusinessOrderByWithRelationInput;
    queueEntry?: Prisma.QueueEntryOrderByWithRelationInput;
};
export type QueueHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    queueEntryId?: string;
    AND?: Prisma.QueueHistoryWhereInput | Prisma.QueueHistoryWhereInput[];
    OR?: Prisma.QueueHistoryWhereInput[];
    NOT?: Prisma.QueueHistoryWhereInput | Prisma.QueueHistoryWhereInput[];
    userId?: Prisma.StringNullableFilter<"QueueHistory"> | string | null;
    businessId?: Prisma.StringFilter<"QueueHistory"> | string;
    queueNumber?: Prisma.StringFilter<"QueueHistory"> | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFilter<"QueueHistory"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueHistory"> | Date | string | null;
    waitingMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    serviceMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    business?: Prisma.XOR<Prisma.BusinessScalarRelationFilter, Prisma.BusinessWhereInput>;
    queueEntry?: Prisma.XOR<Prisma.QueueEntryScalarRelationFilter, Prisma.QueueEntryWhereInput>;
}, "id" | "queueEntryId">;
export type QueueHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    queueEntryId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    finalStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    waitingMinutes?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.QueueHistoryCountOrderByAggregateInput;
    _avg?: Prisma.QueueHistoryAvgOrderByAggregateInput;
    _max?: Prisma.QueueHistoryMaxOrderByAggregateInput;
    _min?: Prisma.QueueHistoryMinOrderByAggregateInput;
    _sum?: Prisma.QueueHistorySumOrderByAggregateInput;
};
export type QueueHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.QueueHistoryScalarWhereWithAggregatesInput | Prisma.QueueHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.QueueHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QueueHistoryScalarWhereWithAggregatesInput | Prisma.QueueHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QueueHistory"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"QueueHistory"> | string | null;
    businessId?: Prisma.StringWithAggregatesFilter<"QueueHistory"> | string;
    queueEntryId?: Prisma.StringWithAggregatesFilter<"QueueHistory"> | string;
    queueNumber?: Prisma.StringWithAggregatesFilter<"QueueHistory"> | string;
    finalStatus?: Prisma.EnumQueueEntryStatusWithAggregatesFilter<"QueueHistory"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"QueueHistory"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueHistory"> | Date | string | null;
    waitingMinutes?: Prisma.IntNullableWithAggregatesFilter<"QueueHistory"> | number | null;
    serviceMinutes?: Prisma.IntNullableWithAggregatesFilter<"QueueHistory"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QueueHistory"> | Date | string;
};
export type QueueHistoryCreateInput = {
    id?: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHistoriesInput;
    business: Prisma.BusinessCreateNestedOneWithoutHistoriesInput;
    queueEntry: Prisma.QueueEntryCreateNestedOneWithoutHistoryInput;
};
export type QueueHistoryUncheckedCreateInput = {
    id?: string;
    userId?: string | null;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHistoriesNestedInput;
    business?: Prisma.BusinessUpdateOneRequiredWithoutHistoriesNestedInput;
    queueEntry?: Prisma.QueueEntryUpdateOneRequiredWithoutHistoryNestedInput;
};
export type QueueHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryCreateManyInput = {
    id?: string;
    userId?: string | null;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryListRelationFilter = {
    every?: Prisma.QueueHistoryWhereInput;
    some?: Prisma.QueueHistoryWhereInput;
    none?: Prisma.QueueHistoryWhereInput;
};
export type QueueHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QueueHistoryNullableScalarRelationFilter = {
    is?: Prisma.QueueHistoryWhereInput | null;
    isNot?: Prisma.QueueHistoryWhereInput | null;
};
export type QueueHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    queueEntryId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    finalStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    waitingMinutes?: Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QueueHistoryAvgOrderByAggregateInput = {
    waitingMinutes?: Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrder;
};
export type QueueHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    queueEntryId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    finalStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    waitingMinutes?: Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QueueHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    queueEntryId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    finalStatus?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    waitingMinutes?: Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type QueueHistorySumOrderByAggregateInput = {
    waitingMinutes?: Prisma.SortOrder;
    serviceMinutes?: Prisma.SortOrder;
};
export type QueueHistoryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput> | Prisma.QueueHistoryCreateWithoutUserInput[] | Prisma.QueueHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutUserInput | Prisma.QueueHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QueueHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
};
export type QueueHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput> | Prisma.QueueHistoryCreateWithoutUserInput[] | Prisma.QueueHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutUserInput | Prisma.QueueHistoryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QueueHistoryCreateManyUserInputEnvelope;
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
};
export type QueueHistoryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput> | Prisma.QueueHistoryCreateWithoutUserInput[] | Prisma.QueueHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutUserInput | Prisma.QueueHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QueueHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.QueueHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QueueHistoryCreateManyUserInputEnvelope;
    set?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    disconnect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    delete?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    update?: Prisma.QueueHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.QueueHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QueueHistoryUpdateManyWithWhereWithoutUserInput | Prisma.QueueHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
};
export type QueueHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput> | Prisma.QueueHistoryCreateWithoutUserInput[] | Prisma.QueueHistoryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutUserInput | Prisma.QueueHistoryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QueueHistoryUpsertWithWhereUniqueWithoutUserInput | Prisma.QueueHistoryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QueueHistoryCreateManyUserInputEnvelope;
    set?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    disconnect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    delete?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    update?: Prisma.QueueHistoryUpdateWithWhereUniqueWithoutUserInput | Prisma.QueueHistoryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QueueHistoryUpdateManyWithWhereWithoutUserInput | Prisma.QueueHistoryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
};
export type QueueHistoryCreateNestedManyWithoutBusinessInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput> | Prisma.QueueHistoryCreateWithoutBusinessInput[] | Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput | Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput[];
    createMany?: Prisma.QueueHistoryCreateManyBusinessInputEnvelope;
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
};
export type QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput> | Prisma.QueueHistoryCreateWithoutBusinessInput[] | Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput | Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput[];
    createMany?: Prisma.QueueHistoryCreateManyBusinessInputEnvelope;
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
};
export type QueueHistoryUpdateManyWithoutBusinessNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput> | Prisma.QueueHistoryCreateWithoutBusinessInput[] | Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput | Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput[];
    upsert?: Prisma.QueueHistoryUpsertWithWhereUniqueWithoutBusinessInput | Prisma.QueueHistoryUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: Prisma.QueueHistoryCreateManyBusinessInputEnvelope;
    set?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    disconnect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    delete?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    update?: Prisma.QueueHistoryUpdateWithWhereUniqueWithoutBusinessInput | Prisma.QueueHistoryUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?: Prisma.QueueHistoryUpdateManyWithWhereWithoutBusinessInput | Prisma.QueueHistoryUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
};
export type QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput> | Prisma.QueueHistoryCreateWithoutBusinessInput[] | Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput | Prisma.QueueHistoryCreateOrConnectWithoutBusinessInput[];
    upsert?: Prisma.QueueHistoryUpsertWithWhereUniqueWithoutBusinessInput | Prisma.QueueHistoryUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: Prisma.QueueHistoryCreateManyBusinessInputEnvelope;
    set?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    disconnect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    delete?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    connect?: Prisma.QueueHistoryWhereUniqueInput | Prisma.QueueHistoryWhereUniqueInput[];
    update?: Prisma.QueueHistoryUpdateWithWhereUniqueWithoutBusinessInput | Prisma.QueueHistoryUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?: Prisma.QueueHistoryUpdateManyWithWhereWithoutBusinessInput | Prisma.QueueHistoryUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
};
export type QueueHistoryCreateNestedOneWithoutQueueEntryInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutQueueEntryInput;
    connect?: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryUncheckedCreateNestedOneWithoutQueueEntryInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutQueueEntryInput;
    connect?: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryUpdateOneWithoutQueueEntryNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutQueueEntryInput;
    upsert?: Prisma.QueueHistoryUpsertWithoutQueueEntryInput;
    disconnect?: Prisma.QueueHistoryWhereInput | boolean;
    delete?: Prisma.QueueHistoryWhereInput | boolean;
    connect?: Prisma.QueueHistoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QueueHistoryUpdateToOneWithWhereWithoutQueueEntryInput, Prisma.QueueHistoryUpdateWithoutQueueEntryInput>, Prisma.QueueHistoryUncheckedUpdateWithoutQueueEntryInput>;
};
export type QueueHistoryUncheckedUpdateOneWithoutQueueEntryNestedInput = {
    create?: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
    connectOrCreate?: Prisma.QueueHistoryCreateOrConnectWithoutQueueEntryInput;
    upsert?: Prisma.QueueHistoryUpsertWithoutQueueEntryInput;
    disconnect?: Prisma.QueueHistoryWhereInput | boolean;
    delete?: Prisma.QueueHistoryWhereInput | boolean;
    connect?: Prisma.QueueHistoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QueueHistoryUpdateToOneWithWhereWithoutQueueEntryInput, Prisma.QueueHistoryUpdateWithoutQueueEntryInput>, Prisma.QueueHistoryUncheckedUpdateWithoutQueueEntryInput>;
};
export type QueueHistoryCreateWithoutUserInput = {
    id?: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
    business: Prisma.BusinessCreateNestedOneWithoutHistoriesInput;
    queueEntry: Prisma.QueueEntryCreateNestedOneWithoutHistoryInput;
};
export type QueueHistoryUncheckedCreateWithoutUserInput = {
    id?: string;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryCreateOrConnectWithoutUserInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput>;
};
export type QueueHistoryCreateManyUserInputEnvelope = {
    data: Prisma.QueueHistoryCreateManyUserInput | Prisma.QueueHistoryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type QueueHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutUserInput, Prisma.QueueHistoryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutUserInput, Prisma.QueueHistoryUncheckedCreateWithoutUserInput>;
};
export type QueueHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutUserInput, Prisma.QueueHistoryUncheckedUpdateWithoutUserInput>;
};
export type QueueHistoryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.QueueHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateManyMutationInput, Prisma.QueueHistoryUncheckedUpdateManyWithoutUserInput>;
};
export type QueueHistoryScalarWhereInput = {
    AND?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
    OR?: Prisma.QueueHistoryScalarWhereInput[];
    NOT?: Prisma.QueueHistoryScalarWhereInput | Prisma.QueueHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"QueueHistory"> | string;
    userId?: Prisma.StringNullableFilter<"QueueHistory"> | string | null;
    businessId?: Prisma.StringFilter<"QueueHistory"> | string;
    queueEntryId?: Prisma.StringFilter<"QueueHistory"> | string;
    queueNumber?: Prisma.StringFilter<"QueueHistory"> | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFilter<"QueueHistory"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueHistory"> | Date | string | null;
    waitingMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    serviceMinutes?: Prisma.IntNullableFilter<"QueueHistory"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"QueueHistory"> | Date | string;
};
export type QueueHistoryCreateWithoutBusinessInput = {
    id?: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHistoriesInput;
    queueEntry: Prisma.QueueEntryCreateNestedOneWithoutHistoryInput;
};
export type QueueHistoryUncheckedCreateWithoutBusinessInput = {
    id?: string;
    userId?: string | null;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryCreateOrConnectWithoutBusinessInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput>;
};
export type QueueHistoryCreateManyBusinessInputEnvelope = {
    data: Prisma.QueueHistoryCreateManyBusinessInput | Prisma.QueueHistoryCreateManyBusinessInput[];
    skipDuplicates?: boolean;
};
export type QueueHistoryUpsertWithWhereUniqueWithoutBusinessInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutBusinessInput, Prisma.QueueHistoryUncheckedUpdateWithoutBusinessInput>;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutBusinessInput, Prisma.QueueHistoryUncheckedCreateWithoutBusinessInput>;
};
export type QueueHistoryUpdateWithWhereUniqueWithoutBusinessInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutBusinessInput, Prisma.QueueHistoryUncheckedUpdateWithoutBusinessInput>;
};
export type QueueHistoryUpdateManyWithWhereWithoutBusinessInput = {
    where: Prisma.QueueHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateManyMutationInput, Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessInput>;
};
export type QueueHistoryCreateWithoutQueueEntryInput = {
    id?: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
    user?: Prisma.UserCreateNestedOneWithoutHistoriesInput;
    business: Prisma.BusinessCreateNestedOneWithoutHistoriesInput;
};
export type QueueHistoryUncheckedCreateWithoutQueueEntryInput = {
    id?: string;
    userId?: string | null;
    businessId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryCreateOrConnectWithoutQueueEntryInput = {
    where: Prisma.QueueHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
};
export type QueueHistoryUpsertWithoutQueueEntryInput = {
    update: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedUpdateWithoutQueueEntryInput>;
    create: Prisma.XOR<Prisma.QueueHistoryCreateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedCreateWithoutQueueEntryInput>;
    where?: Prisma.QueueHistoryWhereInput;
};
export type QueueHistoryUpdateToOneWithWhereWithoutQueueEntryInput = {
    where?: Prisma.QueueHistoryWhereInput;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateWithoutQueueEntryInput, Prisma.QueueHistoryUncheckedUpdateWithoutQueueEntryInput>;
};
export type QueueHistoryUpdateWithoutQueueEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHistoriesNestedInput;
    business?: Prisma.BusinessUpdateOneRequiredWithoutHistoriesNestedInput;
};
export type QueueHistoryUncheckedUpdateWithoutQueueEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryCreateManyUserInput = {
    id?: string;
    businessId: string;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    business?: Prisma.BusinessUpdateOneRequiredWithoutHistoriesNestedInput;
    queueEntry?: Prisma.QueueEntryUpdateOneRequiredWithoutHistoryNestedInput;
};
export type QueueHistoryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryCreateManyBusinessInput = {
    id?: string;
    userId?: string | null;
    queueEntryId: string;
    queueNumber: string;
    finalStatus: $Enums.QueueEntryStatus;
    joinedAt: Date | string;
    completedAt?: Date | string | null;
    waitingMinutes?: number | null;
    serviceMinutes?: number | null;
    createdAt?: Date | string;
};
export type QueueHistoryUpdateWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneWithoutHistoriesNestedInput;
    queueEntry?: Prisma.QueueEntryUpdateOneRequiredWithoutHistoryNestedInput;
};
export type QueueHistoryUncheckedUpdateWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistoryUncheckedUpdateManyWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    finalStatus?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    waitingMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    serviceMinutes?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    businessId?: boolean;
    queueEntryId?: boolean;
    queueNumber?: boolean;
    finalStatus?: boolean;
    joinedAt?: boolean;
    completedAt?: boolean;
    waitingMinutes?: boolean;
    serviceMinutes?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queueHistory"]>;
export type QueueHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    businessId?: boolean;
    queueEntryId?: boolean;
    queueNumber?: boolean;
    finalStatus?: boolean;
    joinedAt?: boolean;
    completedAt?: boolean;
    waitingMinutes?: boolean;
    serviceMinutes?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queueHistory"]>;
export type QueueHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    businessId?: boolean;
    queueEntryId?: boolean;
    queueNumber?: boolean;
    finalStatus?: boolean;
    joinedAt?: boolean;
    completedAt?: boolean;
    waitingMinutes?: boolean;
    serviceMinutes?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queueHistory"]>;
export type QueueHistorySelectScalar = {
    id?: boolean;
    userId?: boolean;
    businessId?: boolean;
    queueEntryId?: boolean;
    queueNumber?: boolean;
    finalStatus?: boolean;
    joinedAt?: boolean;
    completedAt?: boolean;
    waitingMinutes?: boolean;
    serviceMinutes?: boolean;
    createdAt?: boolean;
};
export type QueueHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "businessId" | "queueEntryId" | "queueNumber" | "finalStatus" | "joinedAt" | "completedAt" | "waitingMinutes" | "serviceMinutes" | "createdAt", ExtArgs["result"]["queueHistory"]>;
export type QueueHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
};
export type QueueHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
};
export type QueueHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.QueueHistory$userArgs<ExtArgs>;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    queueEntry?: boolean | Prisma.QueueEntryDefaultArgs<ExtArgs>;
};
export type $QueueHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QueueHistory";
    objects: {
        user: Prisma.$UserPayload<ExtArgs> | null;
        business: Prisma.$BusinessPayload<ExtArgs>;
        queueEntry: Prisma.$QueueEntryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string | null;
        businessId: string;
        queueEntryId: string;
        queueNumber: string;
        finalStatus: $Enums.QueueEntryStatus;
        joinedAt: Date;
        completedAt: Date | null;
        waitingMinutes: number | null;
        serviceMinutes: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["queueHistory"]>;
    composites: {};
};
export type QueueHistoryGetPayload<S extends boolean | null | undefined | QueueHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload, S>;
export type QueueHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QueueHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QueueHistoryCountAggregateInputType | true;
};
export interface QueueHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QueueHistory'];
        meta: {
            name: 'QueueHistory';
        };
    };
    findUnique<T extends QueueHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, QueueHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QueueHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QueueHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QueueHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, QueueHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QueueHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QueueHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QueueHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, QueueHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QueueHistoryCreateArgs>(args: Prisma.SelectSubset<T, QueueHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QueueHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, QueueHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QueueHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QueueHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QueueHistoryDeleteArgs>(args: Prisma.SelectSubset<T, QueueHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QueueHistoryUpdateArgs>(args: Prisma.SelectSubset<T, QueueHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QueueHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, QueueHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QueueHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, QueueHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QueueHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QueueHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QueueHistoryUpsertArgs>(args: Prisma.SelectSubset<T, QueueHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QueueHistoryCountArgs>(args?: Prisma.Subset<T, QueueHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QueueHistoryCountAggregateOutputType> : number>;
    aggregate<T extends QueueHistoryAggregateArgs>(args: Prisma.Subset<T, QueueHistoryAggregateArgs>): Prisma.PrismaPromise<GetQueueHistoryAggregateType<T>>;
    groupBy<T extends QueueHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QueueHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: QueueHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QueueHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QueueHistoryFieldRefs;
}
export interface Prisma__QueueHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.QueueHistory$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueHistory$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    business<T extends Prisma.BusinessDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BusinessDefaultArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    queueEntry<T extends Prisma.QueueEntryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueEntryDefaultArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QueueHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"QueueHistory", 'String'>;
    readonly userId: Prisma.FieldRef<"QueueHistory", 'String'>;
    readonly businessId: Prisma.FieldRef<"QueueHistory", 'String'>;
    readonly queueEntryId: Prisma.FieldRef<"QueueHistory", 'String'>;
    readonly queueNumber: Prisma.FieldRef<"QueueHistory", 'String'>;
    readonly finalStatus: Prisma.FieldRef<"QueueHistory", 'QueueEntryStatus'>;
    readonly joinedAt: Prisma.FieldRef<"QueueHistory", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"QueueHistory", 'DateTime'>;
    readonly waitingMinutes: Prisma.FieldRef<"QueueHistory", 'Int'>;
    readonly serviceMinutes: Prisma.FieldRef<"QueueHistory", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"QueueHistory", 'DateTime'>;
}
export type QueueHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueHistoryCreateInput, Prisma.QueueHistoryUncheckedCreateInput>;
};
export type QueueHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QueueHistoryCreateManyInput | Prisma.QueueHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QueueHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    data: Prisma.QueueHistoryCreateManyInput | Prisma.QueueHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QueueHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QueueHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateInput, Prisma.QueueHistoryUncheckedUpdateInput>;
    where: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QueueHistoryUpdateManyMutationInput, Prisma.QueueHistoryUncheckedUpdateManyInput>;
    where?: Prisma.QueueHistoryWhereInput;
    limit?: number;
};
export type QueueHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueHistoryUpdateManyMutationInput, Prisma.QueueHistoryUncheckedUpdateManyInput>;
    where?: Prisma.QueueHistoryWhereInput;
    limit?: number;
    include?: Prisma.QueueHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QueueHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where: Prisma.QueueHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueHistoryCreateInput, Prisma.QueueHistoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QueueHistoryUpdateInput, Prisma.QueueHistoryUncheckedUpdateInput>;
};
export type QueueHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where: Prisma.QueueHistoryWhereUniqueInput;
};
export type QueueHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueHistoryWhereInput;
    limit?: number;
};
export type QueueHistory$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type QueueHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
};
