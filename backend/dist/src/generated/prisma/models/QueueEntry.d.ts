import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QueueEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$QueueEntryPayload>;
export type AggregateQueueEntry = {
    _count: QueueEntryCountAggregateOutputType | null;
    _avg: QueueEntryAvgAggregateOutputType | null;
    _sum: QueueEntrySumAggregateOutputType | null;
    _min: QueueEntryMinAggregateOutputType | null;
    _max: QueueEntryMaxAggregateOutputType | null;
};
export type QueueEntryAvgAggregateOutputType = {
    sequenceNumber: number | null;
};
export type QueueEntrySumAggregateOutputType = {
    sequenceNumber: number | null;
};
export type QueueEntryMinAggregateOutputType = {
    id: string | null;
    queueId: string | null;
    userId: string | null;
    queueNumber: string | null;
    sequenceNumber: number | null;
    source: $Enums.QueueEntrySource | null;
    status: $Enums.QueueEntryStatus | null;
    joinedAt: Date | null;
    checkedInAt: Date | null;
    calledAt: Date | null;
    serviceStartedAt: Date | null;
    completedAt: Date | null;
    cancelledAt: Date | null;
    noShowAt: Date | null;
};
export type QueueEntryMaxAggregateOutputType = {
    id: string | null;
    queueId: string | null;
    userId: string | null;
    queueNumber: string | null;
    sequenceNumber: number | null;
    source: $Enums.QueueEntrySource | null;
    status: $Enums.QueueEntryStatus | null;
    joinedAt: Date | null;
    checkedInAt: Date | null;
    calledAt: Date | null;
    serviceStartedAt: Date | null;
    completedAt: Date | null;
    cancelledAt: Date | null;
    noShowAt: Date | null;
};
export type QueueEntryCountAggregateOutputType = {
    id: number;
    queueId: number;
    userId: number;
    queueNumber: number;
    sequenceNumber: number;
    source: number;
    status: number;
    joinedAt: number;
    checkedInAt: number;
    calledAt: number;
    serviceStartedAt: number;
    completedAt: number;
    cancelledAt: number;
    noShowAt: number;
    _all: number;
};
export type QueueEntryAvgAggregateInputType = {
    sequenceNumber?: true;
};
export type QueueEntrySumAggregateInputType = {
    sequenceNumber?: true;
};
export type QueueEntryMinAggregateInputType = {
    id?: true;
    queueId?: true;
    userId?: true;
    queueNumber?: true;
    sequenceNumber?: true;
    source?: true;
    status?: true;
    joinedAt?: true;
    checkedInAt?: true;
    calledAt?: true;
    serviceStartedAt?: true;
    completedAt?: true;
    cancelledAt?: true;
    noShowAt?: true;
};
export type QueueEntryMaxAggregateInputType = {
    id?: true;
    queueId?: true;
    userId?: true;
    queueNumber?: true;
    sequenceNumber?: true;
    source?: true;
    status?: true;
    joinedAt?: true;
    checkedInAt?: true;
    calledAt?: true;
    serviceStartedAt?: true;
    completedAt?: true;
    cancelledAt?: true;
    noShowAt?: true;
};
export type QueueEntryCountAggregateInputType = {
    id?: true;
    queueId?: true;
    userId?: true;
    queueNumber?: true;
    sequenceNumber?: true;
    source?: true;
    status?: true;
    joinedAt?: true;
    checkedInAt?: true;
    calledAt?: true;
    serviceStartedAt?: true;
    completedAt?: true;
    cancelledAt?: true;
    noShowAt?: true;
    _all?: true;
};
export type QueueEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueEntryWhereInput;
    orderBy?: Prisma.QueueEntryOrderByWithRelationInput | Prisma.QueueEntryOrderByWithRelationInput[];
    cursor?: Prisma.QueueEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QueueEntryCountAggregateInputType;
    _avg?: QueueEntryAvgAggregateInputType;
    _sum?: QueueEntrySumAggregateInputType;
    _min?: QueueEntryMinAggregateInputType;
    _max?: QueueEntryMaxAggregateInputType;
};
export type GetQueueEntryAggregateType<T extends QueueEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateQueueEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQueueEntry[P]> : Prisma.GetScalarType<T[P], AggregateQueueEntry[P]>;
};
export type QueueEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueEntryWhereInput;
    orderBy?: Prisma.QueueEntryOrderByWithAggregationInput | Prisma.QueueEntryOrderByWithAggregationInput[];
    by: Prisma.QueueEntryScalarFieldEnum[] | Prisma.QueueEntryScalarFieldEnum;
    having?: Prisma.QueueEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QueueEntryCountAggregateInputType | true;
    _avg?: QueueEntryAvgAggregateInputType;
    _sum?: QueueEntrySumAggregateInputType;
    _min?: QueueEntryMinAggregateInputType;
    _max?: QueueEntryMaxAggregateInputType;
};
export type QueueEntryGroupByOutputType = {
    id: string;
    queueId: string;
    userId: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status: $Enums.QueueEntryStatus;
    joinedAt: Date;
    checkedInAt: Date | null;
    calledAt: Date | null;
    serviceStartedAt: Date | null;
    completedAt: Date | null;
    cancelledAt: Date | null;
    noShowAt: Date | null;
    _count: QueueEntryCountAggregateOutputType | null;
    _avg: QueueEntryAvgAggregateOutputType | null;
    _sum: QueueEntrySumAggregateOutputType | null;
    _min: QueueEntryMinAggregateOutputType | null;
    _max: QueueEntryMaxAggregateOutputType | null;
};
export type GetQueueEntryGroupByPayload<T extends QueueEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QueueEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QueueEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QueueEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QueueEntryGroupByOutputType[P]>;
}>>;
export type QueueEntryWhereInput = {
    AND?: Prisma.QueueEntryWhereInput | Prisma.QueueEntryWhereInput[];
    OR?: Prisma.QueueEntryWhereInput[];
    NOT?: Prisma.QueueEntryWhereInput | Prisma.QueueEntryWhereInput[];
    id?: Prisma.StringFilter<"QueueEntry"> | string;
    queueId?: Prisma.StringFilter<"QueueEntry"> | string;
    userId?: Prisma.StringNullableFilter<"QueueEntry"> | string | null;
    queueNumber?: Prisma.StringFilter<"QueueEntry"> | string;
    sequenceNumber?: Prisma.IntFilter<"QueueEntry"> | number;
    source?: Prisma.EnumQueueEntrySourceFilter<"QueueEntry"> | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFilter<"QueueEntry"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueEntry"> | Date | string;
    checkedInAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    calledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    serviceStartedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    noShowAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    queue?: Prisma.XOR<Prisma.QueueScalarRelationFilter, Prisma.QueueWhereInput>;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
    history?: Prisma.XOR<Prisma.QueueHistoryNullableScalarRelationFilter, Prisma.QueueHistoryWhereInput> | null;
};
export type QueueEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    queueId?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    sequenceNumber?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    checkedInAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    calledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceStartedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    noShowAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    queue?: Prisma.QueueOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    history?: Prisma.QueueHistoryOrderByWithRelationInput;
};
export type QueueEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    queueId_queueNumber?: Prisma.QueueEntryQueueIdQueueNumberCompoundUniqueInput;
    queueId_sequenceNumber?: Prisma.QueueEntryQueueIdSequenceNumberCompoundUniqueInput;
    AND?: Prisma.QueueEntryWhereInput | Prisma.QueueEntryWhereInput[];
    OR?: Prisma.QueueEntryWhereInput[];
    NOT?: Prisma.QueueEntryWhereInput | Prisma.QueueEntryWhereInput[];
    queueId?: Prisma.StringFilter<"QueueEntry"> | string;
    userId?: Prisma.StringNullableFilter<"QueueEntry"> | string | null;
    queueNumber?: Prisma.StringFilter<"QueueEntry"> | string;
    sequenceNumber?: Prisma.IntFilter<"QueueEntry"> | number;
    source?: Prisma.EnumQueueEntrySourceFilter<"QueueEntry"> | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFilter<"QueueEntry"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueEntry"> | Date | string;
    checkedInAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    calledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    serviceStartedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    noShowAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    queue?: Prisma.XOR<Prisma.QueueScalarRelationFilter, Prisma.QueueWhereInput>;
    user?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    notifications?: Prisma.NotificationListRelationFilter;
    history?: Prisma.XOR<Prisma.QueueHistoryNullableScalarRelationFilter, Prisma.QueueHistoryWhereInput> | null;
}, "id" | "queueId_queueNumber" | "queueId_sequenceNumber">;
export type QueueEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    queueId?: Prisma.SortOrder;
    userId?: Prisma.SortOrderInput | Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    sequenceNumber?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    checkedInAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    calledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceStartedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    noShowAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.QueueEntryCountOrderByAggregateInput;
    _avg?: Prisma.QueueEntryAvgOrderByAggregateInput;
    _max?: Prisma.QueueEntryMaxOrderByAggregateInput;
    _min?: Prisma.QueueEntryMinOrderByAggregateInput;
    _sum?: Prisma.QueueEntrySumOrderByAggregateInput;
};
export type QueueEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.QueueEntryScalarWhereWithAggregatesInput | Prisma.QueueEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.QueueEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QueueEntryScalarWhereWithAggregatesInput | Prisma.QueueEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QueueEntry"> | string;
    queueId?: Prisma.StringWithAggregatesFilter<"QueueEntry"> | string;
    userId?: Prisma.StringNullableWithAggregatesFilter<"QueueEntry"> | string | null;
    queueNumber?: Prisma.StringWithAggregatesFilter<"QueueEntry"> | string;
    sequenceNumber?: Prisma.IntWithAggregatesFilter<"QueueEntry"> | number;
    source?: Prisma.EnumQueueEntrySourceWithAggregatesFilter<"QueueEntry"> | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusWithAggregatesFilter<"QueueEntry"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"QueueEntry"> | Date | string;
    checkedInAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
    calledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
    serviceStartedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
    cancelledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
    noShowAt?: Prisma.DateTimeNullableWithAggregatesFilter<"QueueEntry"> | Date | string | null;
};
export type QueueEntryCreateInput = {
    id?: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    queue: Prisma.QueueCreateNestedOneWithoutEntriesInput;
    user?: Prisma.UserCreateNestedOneWithoutQueueEntriesInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryUncheckedCreateInput = {
    id?: string;
    queueId: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryUncheckedCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    queue?: Prisma.QueueUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneWithoutQueueEntriesNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUncheckedUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryCreateManyInput = {
    id?: string;
    queueId: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
};
export type QueueEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QueueEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QueueEntryListRelationFilter = {
    every?: Prisma.QueueEntryWhereInput;
    some?: Prisma.QueueEntryWhereInput;
    none?: Prisma.QueueEntryWhereInput;
};
export type QueueEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QueueEntryQueueIdQueueNumberCompoundUniqueInput = {
    queueId: string;
    queueNumber: string;
};
export type QueueEntryQueueIdSequenceNumberCompoundUniqueInput = {
    queueId: string;
    sequenceNumber: number;
};
export type QueueEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queueId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    sequenceNumber?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    checkedInAt?: Prisma.SortOrder;
    calledAt?: Prisma.SortOrder;
    serviceStartedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    noShowAt?: Prisma.SortOrder;
};
export type QueueEntryAvgOrderByAggregateInput = {
    sequenceNumber?: Prisma.SortOrder;
};
export type QueueEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queueId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    sequenceNumber?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    checkedInAt?: Prisma.SortOrder;
    calledAt?: Prisma.SortOrder;
    serviceStartedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    noShowAt?: Prisma.SortOrder;
};
export type QueueEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    queueId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    queueNumber?: Prisma.SortOrder;
    sequenceNumber?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    checkedInAt?: Prisma.SortOrder;
    calledAt?: Prisma.SortOrder;
    serviceStartedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    cancelledAt?: Prisma.SortOrder;
    noShowAt?: Prisma.SortOrder;
};
export type QueueEntrySumOrderByAggregateInput = {
    sequenceNumber?: Prisma.SortOrder;
};
export type QueueEntryNullableScalarRelationFilter = {
    is?: Prisma.QueueEntryWhereInput | null;
    isNot?: Prisma.QueueEntryWhereInput | null;
};
export type QueueEntryScalarRelationFilter = {
    is?: Prisma.QueueEntryWhereInput;
    isNot?: Prisma.QueueEntryWhereInput;
};
export type QueueEntryCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput> | Prisma.QueueEntryCreateWithoutUserInput[] | Prisma.QueueEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutUserInput | Prisma.QueueEntryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QueueEntryCreateManyUserInputEnvelope;
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
};
export type QueueEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput> | Prisma.QueueEntryCreateWithoutUserInput[] | Prisma.QueueEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutUserInput | Prisma.QueueEntryCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.QueueEntryCreateManyUserInputEnvelope;
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
};
export type QueueEntryUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput> | Prisma.QueueEntryCreateWithoutUserInput[] | Prisma.QueueEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutUserInput | Prisma.QueueEntryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QueueEntryUpsertWithWhereUniqueWithoutUserInput | Prisma.QueueEntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QueueEntryCreateManyUserInputEnvelope;
    set?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    disconnect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    delete?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    update?: Prisma.QueueEntryUpdateWithWhereUniqueWithoutUserInput | Prisma.QueueEntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QueueEntryUpdateManyWithWhereWithoutUserInput | Prisma.QueueEntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
};
export type QueueEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput> | Prisma.QueueEntryCreateWithoutUserInput[] | Prisma.QueueEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutUserInput | Prisma.QueueEntryCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.QueueEntryUpsertWithWhereUniqueWithoutUserInput | Prisma.QueueEntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.QueueEntryCreateManyUserInputEnvelope;
    set?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    disconnect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    delete?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    update?: Prisma.QueueEntryUpdateWithWhereUniqueWithoutUserInput | Prisma.QueueEntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.QueueEntryUpdateManyWithWhereWithoutUserInput | Prisma.QueueEntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
};
export type QueueEntryCreateNestedManyWithoutQueueInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput> | Prisma.QueueEntryCreateWithoutQueueInput[] | Prisma.QueueEntryUncheckedCreateWithoutQueueInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutQueueInput | Prisma.QueueEntryCreateOrConnectWithoutQueueInput[];
    createMany?: Prisma.QueueEntryCreateManyQueueInputEnvelope;
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
};
export type QueueEntryUncheckedCreateNestedManyWithoutQueueInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput> | Prisma.QueueEntryCreateWithoutQueueInput[] | Prisma.QueueEntryUncheckedCreateWithoutQueueInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutQueueInput | Prisma.QueueEntryCreateOrConnectWithoutQueueInput[];
    createMany?: Prisma.QueueEntryCreateManyQueueInputEnvelope;
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
};
export type QueueEntryUpdateManyWithoutQueueNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput> | Prisma.QueueEntryCreateWithoutQueueInput[] | Prisma.QueueEntryUncheckedCreateWithoutQueueInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutQueueInput | Prisma.QueueEntryCreateOrConnectWithoutQueueInput[];
    upsert?: Prisma.QueueEntryUpsertWithWhereUniqueWithoutQueueInput | Prisma.QueueEntryUpsertWithWhereUniqueWithoutQueueInput[];
    createMany?: Prisma.QueueEntryCreateManyQueueInputEnvelope;
    set?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    disconnect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    delete?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    update?: Prisma.QueueEntryUpdateWithWhereUniqueWithoutQueueInput | Prisma.QueueEntryUpdateWithWhereUniqueWithoutQueueInput[];
    updateMany?: Prisma.QueueEntryUpdateManyWithWhereWithoutQueueInput | Prisma.QueueEntryUpdateManyWithWhereWithoutQueueInput[];
    deleteMany?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
};
export type QueueEntryUncheckedUpdateManyWithoutQueueNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput> | Prisma.QueueEntryCreateWithoutQueueInput[] | Prisma.QueueEntryUncheckedCreateWithoutQueueInput[];
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutQueueInput | Prisma.QueueEntryCreateOrConnectWithoutQueueInput[];
    upsert?: Prisma.QueueEntryUpsertWithWhereUniqueWithoutQueueInput | Prisma.QueueEntryUpsertWithWhereUniqueWithoutQueueInput[];
    createMany?: Prisma.QueueEntryCreateManyQueueInputEnvelope;
    set?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    disconnect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    delete?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    connect?: Prisma.QueueEntryWhereUniqueInput | Prisma.QueueEntryWhereUniqueInput[];
    update?: Prisma.QueueEntryUpdateWithWhereUniqueWithoutQueueInput | Prisma.QueueEntryUpdateWithWhereUniqueWithoutQueueInput[];
    updateMany?: Prisma.QueueEntryUpdateManyWithWhereWithoutQueueInput | Prisma.QueueEntryUpdateManyWithWhereWithoutQueueInput[];
    deleteMany?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
};
export type EnumQueueEntrySourceFieldUpdateOperationsInput = {
    set?: $Enums.QueueEntrySource;
};
export type EnumQueueEntryStatusFieldUpdateOperationsInput = {
    set?: $Enums.QueueEntryStatus;
};
export type QueueEntryCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutNotificationsInput, Prisma.QueueEntryUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutNotificationsInput, Prisma.QueueEntryUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.QueueEntryUpsertWithoutNotificationsInput;
    disconnect?: Prisma.QueueEntryWhereInput | boolean;
    delete?: Prisma.QueueEntryWhereInput | boolean;
    connect?: Prisma.QueueEntryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QueueEntryUpdateToOneWithWhereWithoutNotificationsInput, Prisma.QueueEntryUpdateWithoutNotificationsInput>, Prisma.QueueEntryUncheckedUpdateWithoutNotificationsInput>;
};
export type QueueEntryCreateNestedOneWithoutHistoryInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutHistoryInput, Prisma.QueueEntryUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutHistoryInput;
    connect?: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.QueueEntryCreateWithoutHistoryInput, Prisma.QueueEntryUncheckedCreateWithoutHistoryInput>;
    connectOrCreate?: Prisma.QueueEntryCreateOrConnectWithoutHistoryInput;
    upsert?: Prisma.QueueEntryUpsertWithoutHistoryInput;
    connect?: Prisma.QueueEntryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QueueEntryUpdateToOneWithWhereWithoutHistoryInput, Prisma.QueueEntryUpdateWithoutHistoryInput>, Prisma.QueueEntryUncheckedUpdateWithoutHistoryInput>;
};
export type QueueEntryCreateWithoutUserInput = {
    id?: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    queue: Prisma.QueueCreateNestedOneWithoutEntriesInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryUncheckedCreateWithoutUserInput = {
    id?: string;
    queueId: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryUncheckedCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryCreateOrConnectWithoutUserInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput>;
};
export type QueueEntryCreateManyUserInputEnvelope = {
    data: Prisma.QueueEntryCreateManyUserInput | Prisma.QueueEntryCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type QueueEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.QueueEntryUpdateWithoutUserInput, Prisma.QueueEntryUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutUserInput, Prisma.QueueEntryUncheckedCreateWithoutUserInput>;
};
export type QueueEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateWithoutUserInput, Prisma.QueueEntryUncheckedUpdateWithoutUserInput>;
};
export type QueueEntryUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.QueueEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateManyMutationInput, Prisma.QueueEntryUncheckedUpdateManyWithoutUserInput>;
};
export type QueueEntryScalarWhereInput = {
    AND?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
    OR?: Prisma.QueueEntryScalarWhereInput[];
    NOT?: Prisma.QueueEntryScalarWhereInput | Prisma.QueueEntryScalarWhereInput[];
    id?: Prisma.StringFilter<"QueueEntry"> | string;
    queueId?: Prisma.StringFilter<"QueueEntry"> | string;
    userId?: Prisma.StringNullableFilter<"QueueEntry"> | string | null;
    queueNumber?: Prisma.StringFilter<"QueueEntry"> | string;
    sequenceNumber?: Prisma.IntFilter<"QueueEntry"> | number;
    source?: Prisma.EnumQueueEntrySourceFilter<"QueueEntry"> | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFilter<"QueueEntry"> | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFilter<"QueueEntry"> | Date | string;
    checkedInAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    calledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    serviceStartedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    cancelledAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
    noShowAt?: Prisma.DateTimeNullableFilter<"QueueEntry"> | Date | string | null;
};
export type QueueEntryCreateWithoutQueueInput = {
    id?: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    user?: Prisma.UserCreateNestedOneWithoutQueueEntriesInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryUncheckedCreateWithoutQueueInput = {
    id?: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutQueueEntryInput;
    history?: Prisma.QueueHistoryUncheckedCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryCreateOrConnectWithoutQueueInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput>;
};
export type QueueEntryCreateManyQueueInputEnvelope = {
    data: Prisma.QueueEntryCreateManyQueueInput | Prisma.QueueEntryCreateManyQueueInput[];
    skipDuplicates?: boolean;
};
export type QueueEntryUpsertWithWhereUniqueWithoutQueueInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.QueueEntryUpdateWithoutQueueInput, Prisma.QueueEntryUncheckedUpdateWithoutQueueInput>;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutQueueInput, Prisma.QueueEntryUncheckedCreateWithoutQueueInput>;
};
export type QueueEntryUpdateWithWhereUniqueWithoutQueueInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateWithoutQueueInput, Prisma.QueueEntryUncheckedUpdateWithoutQueueInput>;
};
export type QueueEntryUpdateManyWithWhereWithoutQueueInput = {
    where: Prisma.QueueEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateManyMutationInput, Prisma.QueueEntryUncheckedUpdateManyWithoutQueueInput>;
};
export type QueueEntryCreateWithoutNotificationsInput = {
    id?: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    queue: Prisma.QueueCreateNestedOneWithoutEntriesInput;
    user?: Prisma.UserCreateNestedOneWithoutQueueEntriesInput;
    history?: Prisma.QueueHistoryCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    queueId: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    history?: Prisma.QueueHistoryUncheckedCreateNestedOneWithoutQueueEntryInput;
};
export type QueueEntryCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutNotificationsInput, Prisma.QueueEntryUncheckedCreateWithoutNotificationsInput>;
};
export type QueueEntryUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.QueueEntryUpdateWithoutNotificationsInput, Prisma.QueueEntryUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutNotificationsInput, Prisma.QueueEntryUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.QueueEntryWhereInput;
};
export type QueueEntryUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.QueueEntryWhereInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateWithoutNotificationsInput, Prisma.QueueEntryUncheckedUpdateWithoutNotificationsInput>;
};
export type QueueEntryUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    queue?: Prisma.QueueUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneWithoutQueueEntriesNestedInput;
    history?: Prisma.QueueHistoryUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    history?: Prisma.QueueHistoryUncheckedUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryCreateWithoutHistoryInput = {
    id?: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    queue: Prisma.QueueCreateNestedOneWithoutEntriesInput;
    user?: Prisma.UserCreateNestedOneWithoutQueueEntriesInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutQueueEntryInput;
};
export type QueueEntryUncheckedCreateWithoutHistoryInput = {
    id?: string;
    queueId: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutQueueEntryInput;
};
export type QueueEntryCreateOrConnectWithoutHistoryInput = {
    where: Prisma.QueueEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutHistoryInput, Prisma.QueueEntryUncheckedCreateWithoutHistoryInput>;
};
export type QueueEntryUpsertWithoutHistoryInput = {
    update: Prisma.XOR<Prisma.QueueEntryUpdateWithoutHistoryInput, Prisma.QueueEntryUncheckedUpdateWithoutHistoryInput>;
    create: Prisma.XOR<Prisma.QueueEntryCreateWithoutHistoryInput, Prisma.QueueEntryUncheckedCreateWithoutHistoryInput>;
    where?: Prisma.QueueEntryWhereInput;
};
export type QueueEntryUpdateToOneWithWhereWithoutHistoryInput = {
    where?: Prisma.QueueEntryWhereInput;
    data: Prisma.XOR<Prisma.QueueEntryUpdateWithoutHistoryInput, Prisma.QueueEntryUncheckedUpdateWithoutHistoryInput>;
};
export type QueueEntryUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    queue?: Prisma.QueueUpdateOneRequiredWithoutEntriesNestedInput;
    user?: Prisma.UserUpdateOneWithoutQueueEntriesNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateWithoutHistoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutQueueEntryNestedInput;
};
export type QueueEntryCreateManyUserInput = {
    id?: string;
    queueId: string;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
};
export type QueueEntryUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    queue?: Prisma.QueueUpdateOneRequiredWithoutEntriesNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUncheckedUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueId?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QueueEntryCreateManyQueueInput = {
    id?: string;
    userId?: string | null;
    queueNumber: string;
    sequenceNumber: number;
    source: $Enums.QueueEntrySource;
    status?: $Enums.QueueEntryStatus;
    joinedAt?: Date | string;
    checkedInAt?: Date | string | null;
    calledAt?: Date | string | null;
    serviceStartedAt?: Date | string | null;
    completedAt?: Date | string | null;
    cancelledAt?: Date | string | null;
    noShowAt?: Date | string | null;
};
export type QueueEntryUpdateWithoutQueueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneWithoutQueueEntriesNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateWithoutQueueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutQueueEntryNestedInput;
    history?: Prisma.QueueHistoryUncheckedUpdateOneWithoutQueueEntryNestedInput;
};
export type QueueEntryUncheckedUpdateManyWithoutQueueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    queueNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    sequenceNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    source?: Prisma.EnumQueueEntrySourceFieldUpdateOperationsInput | $Enums.QueueEntrySource;
    status?: Prisma.EnumQueueEntryStatusFieldUpdateOperationsInput | $Enums.QueueEntryStatus;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkedInAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    calledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    serviceStartedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cancelledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    noShowAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type QueueEntryCountOutputType = {
    notifications: number;
};
export type QueueEntryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    notifications?: boolean | QueueEntryCountOutputTypeCountNotificationsArgs;
};
export type QueueEntryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntryCountOutputTypeSelect<ExtArgs> | null;
};
export type QueueEntryCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type QueueEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queueId?: boolean;
    userId?: boolean;
    queueNumber?: boolean;
    sequenceNumber?: boolean;
    source?: boolean;
    status?: boolean;
    joinedAt?: boolean;
    checkedInAt?: boolean;
    calledAt?: boolean;
    serviceStartedAt?: boolean;
    completedAt?: boolean;
    cancelledAt?: boolean;
    noShowAt?: boolean;
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
    notifications?: boolean | Prisma.QueueEntry$notificationsArgs<ExtArgs>;
    history?: boolean | Prisma.QueueEntry$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.QueueEntryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queueEntry"]>;
export type QueueEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queueId?: boolean;
    userId?: boolean;
    queueNumber?: boolean;
    sequenceNumber?: boolean;
    source?: boolean;
    status?: boolean;
    joinedAt?: boolean;
    checkedInAt?: boolean;
    calledAt?: boolean;
    serviceStartedAt?: boolean;
    completedAt?: boolean;
    cancelledAt?: boolean;
    noShowAt?: boolean;
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
}, ExtArgs["result"]["queueEntry"]>;
export type QueueEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    queueId?: boolean;
    userId?: boolean;
    queueNumber?: boolean;
    sequenceNumber?: boolean;
    source?: boolean;
    status?: boolean;
    joinedAt?: boolean;
    checkedInAt?: boolean;
    calledAt?: boolean;
    serviceStartedAt?: boolean;
    completedAt?: boolean;
    cancelledAt?: boolean;
    noShowAt?: boolean;
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
}, ExtArgs["result"]["queueEntry"]>;
export type QueueEntrySelectScalar = {
    id?: boolean;
    queueId?: boolean;
    userId?: boolean;
    queueNumber?: boolean;
    sequenceNumber?: boolean;
    source?: boolean;
    status?: boolean;
    joinedAt?: boolean;
    checkedInAt?: boolean;
    calledAt?: boolean;
    serviceStartedAt?: boolean;
    completedAt?: boolean;
    cancelledAt?: boolean;
    noShowAt?: boolean;
};
export type QueueEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "queueId" | "userId" | "queueNumber" | "sequenceNumber" | "source" | "status" | "joinedAt" | "checkedInAt" | "calledAt" | "serviceStartedAt" | "completedAt" | "cancelledAt" | "noShowAt", ExtArgs["result"]["queueEntry"]>;
export type QueueEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
    notifications?: boolean | Prisma.QueueEntry$notificationsArgs<ExtArgs>;
    history?: boolean | Prisma.QueueEntry$historyArgs<ExtArgs>;
    _count?: boolean | Prisma.QueueEntryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QueueEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
};
export type QueueEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    queue?: boolean | Prisma.QueueDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.QueueEntry$userArgs<ExtArgs>;
};
export type $QueueEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QueueEntry";
    objects: {
        queue: Prisma.$QueuePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs> | null;
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        history: Prisma.$QueueHistoryPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        queueId: string;
        userId: string | null;
        queueNumber: string;
        sequenceNumber: number;
        source: $Enums.QueueEntrySource;
        status: $Enums.QueueEntryStatus;
        joinedAt: Date;
        checkedInAt: Date | null;
        calledAt: Date | null;
        serviceStartedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
        noShowAt: Date | null;
    }, ExtArgs["result"]["queueEntry"]>;
    composites: {};
};
export type QueueEntryGetPayload<S extends boolean | null | undefined | QueueEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload, S>;
export type QueueEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QueueEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QueueEntryCountAggregateInputType | true;
};
export interface QueueEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QueueEntry'];
        meta: {
            name: 'QueueEntry';
        };
    };
    findUnique<T extends QueueEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, QueueEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QueueEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QueueEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QueueEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, QueueEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QueueEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QueueEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QueueEntryFindManyArgs>(args?: Prisma.SelectSubset<T, QueueEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QueueEntryCreateArgs>(args: Prisma.SelectSubset<T, QueueEntryCreateArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QueueEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, QueueEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QueueEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QueueEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QueueEntryDeleteArgs>(args: Prisma.SelectSubset<T, QueueEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QueueEntryUpdateArgs>(args: Prisma.SelectSubset<T, QueueEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QueueEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, QueueEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QueueEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, QueueEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QueueEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QueueEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QueueEntryUpsertArgs>(args: Prisma.SelectSubset<T, QueueEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__QueueEntryClient<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QueueEntryCountArgs>(args?: Prisma.Subset<T, QueueEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QueueEntryCountAggregateOutputType> : number>;
    aggregate<T extends QueueEntryAggregateArgs>(args: Prisma.Subset<T, QueueEntryAggregateArgs>): Prisma.PrismaPromise<GetQueueEntryAggregateType<T>>;
    groupBy<T extends QueueEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QueueEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: QueueEntryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QueueEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QueueEntryFieldRefs;
}
export interface Prisma__QueueEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    queue<T extends Prisma.QueueDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueDefaultArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.QueueEntry$userArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueEntry$userArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    notifications<T extends Prisma.QueueEntry$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueEntry$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    history<T extends Prisma.QueueEntry$historyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QueueEntry$historyArgs<ExtArgs>>): Prisma.Prisma__QueueHistoryClient<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QueueEntryFieldRefs {
    readonly id: Prisma.FieldRef<"QueueEntry", 'String'>;
    readonly queueId: Prisma.FieldRef<"QueueEntry", 'String'>;
    readonly userId: Prisma.FieldRef<"QueueEntry", 'String'>;
    readonly queueNumber: Prisma.FieldRef<"QueueEntry", 'String'>;
    readonly sequenceNumber: Prisma.FieldRef<"QueueEntry", 'Int'>;
    readonly source: Prisma.FieldRef<"QueueEntry", 'QueueEntrySource'>;
    readonly status: Prisma.FieldRef<"QueueEntry", 'QueueEntryStatus'>;
    readonly joinedAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly checkedInAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly calledAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly serviceStartedAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly cancelledAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
    readonly noShowAt: Prisma.FieldRef<"QueueEntry", 'DateTime'>;
}
export type QueueEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    where: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    where: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueEntryCreateInput, Prisma.QueueEntryUncheckedCreateInput>;
};
export type QueueEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QueueEntryCreateManyInput | Prisma.QueueEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QueueEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    data: Prisma.QueueEntryCreateManyInput | Prisma.QueueEntryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QueueEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QueueEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueEntryUpdateInput, Prisma.QueueEntryUncheckedUpdateInput>;
    where: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QueueEntryUpdateManyMutationInput, Prisma.QueueEntryUncheckedUpdateManyInput>;
    where?: Prisma.QueueEntryWhereInput;
    limit?: number;
};
export type QueueEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueEntryUpdateManyMutationInput, Prisma.QueueEntryUncheckedUpdateManyInput>;
    where?: Prisma.QueueEntryWhereInput;
    limit?: number;
    include?: Prisma.QueueEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QueueEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    where: Prisma.QueueEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueEntryCreateInput, Prisma.QueueEntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QueueEntryUpdateInput, Prisma.QueueEntryUncheckedUpdateInput>;
};
export type QueueEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
    where: Prisma.QueueEntryWhereUniqueInput;
};
export type QueueEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueEntryWhereInput;
    limit?: number;
};
export type QueueEntry$userArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type QueueEntry$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueEntry$historyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueHistorySelect<ExtArgs> | null;
    omit?: Prisma.QueueHistoryOmit<ExtArgs> | null;
    include?: Prisma.QueueHistoryInclude<ExtArgs> | null;
    where?: Prisma.QueueHistoryWhereInput;
};
export type QueueEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueEntrySelect<ExtArgs> | null;
    omit?: Prisma.QueueEntryOmit<ExtArgs> | null;
    include?: Prisma.QueueEntryInclude<ExtArgs> | null;
};
