import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QueueModel = runtime.Types.Result.DefaultSelection<Prisma.$QueuePayload>;
export type AggregateQueue = {
    _count: QueueCountAggregateOutputType | null;
    _avg: QueueAvgAggregateOutputType | null;
    _sum: QueueSumAggregateOutputType | null;
    _min: QueueMinAggregateOutputType | null;
    _max: QueueMaxAggregateOutputType | null;
};
export type QueueAvgAggregateOutputType = {
    nextSequence: number | null;
    averageServiceTimeMinutes: number | null;
};
export type QueueSumAggregateOutputType = {
    nextSequence: number | null;
    averageServiceTimeMinutes: number | null;
};
export type QueueMinAggregateOutputType = {
    id: string | null;
    businessId: string | null;
    status: $Enums.QueueStatus | null;
    currentNumber: string | null;
    nextSequence: number | null;
    averageServiceTimeMinutes: number | null;
    openedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QueueMaxAggregateOutputType = {
    id: string | null;
    businessId: string | null;
    status: $Enums.QueueStatus | null;
    currentNumber: string | null;
    nextSequence: number | null;
    averageServiceTimeMinutes: number | null;
    openedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QueueCountAggregateOutputType = {
    id: number;
    businessId: number;
    status: number;
    currentNumber: number;
    nextSequence: number;
    averageServiceTimeMinutes: number;
    openedAt: number;
    closedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type QueueAvgAggregateInputType = {
    nextSequence?: true;
    averageServiceTimeMinutes?: true;
};
export type QueueSumAggregateInputType = {
    nextSequence?: true;
    averageServiceTimeMinutes?: true;
};
export type QueueMinAggregateInputType = {
    id?: true;
    businessId?: true;
    status?: true;
    currentNumber?: true;
    nextSequence?: true;
    averageServiceTimeMinutes?: true;
    openedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QueueMaxAggregateInputType = {
    id?: true;
    businessId?: true;
    status?: true;
    currentNumber?: true;
    nextSequence?: true;
    averageServiceTimeMinutes?: true;
    openedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QueueCountAggregateInputType = {
    id?: true;
    businessId?: true;
    status?: true;
    currentNumber?: true;
    nextSequence?: true;
    averageServiceTimeMinutes?: true;
    openedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type QueueAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueWhereInput;
    orderBy?: Prisma.QueueOrderByWithRelationInput | Prisma.QueueOrderByWithRelationInput[];
    cursor?: Prisma.QueueWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QueueCountAggregateInputType;
    _avg?: QueueAvgAggregateInputType;
    _sum?: QueueSumAggregateInputType;
    _min?: QueueMinAggregateInputType;
    _max?: QueueMaxAggregateInputType;
};
export type GetQueueAggregateType<T extends QueueAggregateArgs> = {
    [P in keyof T & keyof AggregateQueue]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQueue[P]> : Prisma.GetScalarType<T[P], AggregateQueue[P]>;
};
export type QueueGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueWhereInput;
    orderBy?: Prisma.QueueOrderByWithAggregationInput | Prisma.QueueOrderByWithAggregationInput[];
    by: Prisma.QueueScalarFieldEnum[] | Prisma.QueueScalarFieldEnum;
    having?: Prisma.QueueScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QueueCountAggregateInputType | true;
    _avg?: QueueAvgAggregateInputType;
    _sum?: QueueSumAggregateInputType;
    _min?: QueueMinAggregateInputType;
    _max?: QueueMaxAggregateInputType;
};
export type QueueGroupByOutputType = {
    id: string;
    businessId: string;
    status: $Enums.QueueStatus;
    currentNumber: string | null;
    nextSequence: number;
    averageServiceTimeMinutes: number;
    openedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: QueueCountAggregateOutputType | null;
    _avg: QueueAvgAggregateOutputType | null;
    _sum: QueueSumAggregateOutputType | null;
    _min: QueueMinAggregateOutputType | null;
    _max: QueueMaxAggregateOutputType | null;
};
export type GetQueueGroupByPayload<T extends QueueGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QueueGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QueueGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QueueGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QueueGroupByOutputType[P]>;
}>>;
export type QueueWhereInput = {
    AND?: Prisma.QueueWhereInput | Prisma.QueueWhereInput[];
    OR?: Prisma.QueueWhereInput[];
    NOT?: Prisma.QueueWhereInput | Prisma.QueueWhereInput[];
    id?: Prisma.StringFilter<"Queue"> | string;
    businessId?: Prisma.StringFilter<"Queue"> | string;
    status?: Prisma.EnumQueueStatusFilter<"Queue"> | $Enums.QueueStatus;
    currentNumber?: Prisma.StringNullableFilter<"Queue"> | string | null;
    nextSequence?: Prisma.IntFilter<"Queue"> | number;
    averageServiceTimeMinutes?: Prisma.IntFilter<"Queue"> | number;
    openedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
    business?: Prisma.XOR<Prisma.BusinessScalarRelationFilter, Prisma.BusinessWhereInput>;
    entries?: Prisma.QueueEntryListRelationFilter;
};
export type QueueOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
    openedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    business?: Prisma.BusinessOrderByWithRelationInput;
    entries?: Prisma.QueueEntryOrderByRelationAggregateInput;
};
export type QueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.QueueWhereInput | Prisma.QueueWhereInput[];
    OR?: Prisma.QueueWhereInput[];
    NOT?: Prisma.QueueWhereInput | Prisma.QueueWhereInput[];
    businessId?: Prisma.StringFilter<"Queue"> | string;
    status?: Prisma.EnumQueueStatusFilter<"Queue"> | $Enums.QueueStatus;
    currentNumber?: Prisma.StringNullableFilter<"Queue"> | string | null;
    nextSequence?: Prisma.IntFilter<"Queue"> | number;
    averageServiceTimeMinutes?: Prisma.IntFilter<"Queue"> | number;
    openedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
    business?: Prisma.XOR<Prisma.BusinessScalarRelationFilter, Prisma.BusinessWhereInput>;
    entries?: Prisma.QueueEntryListRelationFilter;
}, "id">;
export type QueueOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
    openedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.QueueCountOrderByAggregateInput;
    _avg?: Prisma.QueueAvgOrderByAggregateInput;
    _max?: Prisma.QueueMaxOrderByAggregateInput;
    _min?: Prisma.QueueMinOrderByAggregateInput;
    _sum?: Prisma.QueueSumOrderByAggregateInput;
};
export type QueueScalarWhereWithAggregatesInput = {
    AND?: Prisma.QueueScalarWhereWithAggregatesInput | Prisma.QueueScalarWhereWithAggregatesInput[];
    OR?: Prisma.QueueScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QueueScalarWhereWithAggregatesInput | Prisma.QueueScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Queue"> | string;
    businessId?: Prisma.StringWithAggregatesFilter<"Queue"> | string;
    status?: Prisma.EnumQueueStatusWithAggregatesFilter<"Queue"> | $Enums.QueueStatus;
    currentNumber?: Prisma.StringNullableWithAggregatesFilter<"Queue"> | string | null;
    nextSequence?: Prisma.IntWithAggregatesFilter<"Queue"> | number;
    averageServiceTimeMinutes?: Prisma.IntWithAggregatesFilter<"Queue"> | number;
    openedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Queue"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Queue"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Queue"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Queue"> | Date | string;
};
export type QueueCreateInput = {
    id?: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    business: Prisma.BusinessCreateNestedOneWithoutQueuesInput;
    entries?: Prisma.QueueEntryCreateNestedManyWithoutQueueInput;
};
export type QueueUncheckedCreateInput = {
    id?: string;
    businessId: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutQueueInput;
};
export type QueueUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    business?: Prisma.BusinessUpdateOneRequiredWithoutQueuesNestedInput;
    entries?: Prisma.QueueEntryUpdateManyWithoutQueueNestedInput;
};
export type QueueUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.QueueEntryUncheckedUpdateManyWithoutQueueNestedInput;
};
export type QueueCreateManyInput = {
    id?: string;
    businessId: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QueueUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueListRelationFilter = {
    every?: Prisma.QueueWhereInput;
    some?: Prisma.QueueWhereInput;
    none?: Prisma.QueueWhereInput;
};
export type QueueOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QueueCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentNumber?: Prisma.SortOrder;
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
    openedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QueueAvgOrderByAggregateInput = {
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
};
export type QueueMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentNumber?: Prisma.SortOrder;
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
    openedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QueueMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    businessId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    currentNumber?: Prisma.SortOrder;
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
    openedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QueueSumOrderByAggregateInput = {
    nextSequence?: Prisma.SortOrder;
    averageServiceTimeMinutes?: Prisma.SortOrder;
};
export type QueueScalarRelationFilter = {
    is?: Prisma.QueueWhereInput;
    isNot?: Prisma.QueueWhereInput;
};
export type QueueCreateNestedManyWithoutBusinessInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput> | Prisma.QueueCreateWithoutBusinessInput[] | Prisma.QueueUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutBusinessInput | Prisma.QueueCreateOrConnectWithoutBusinessInput[];
    createMany?: Prisma.QueueCreateManyBusinessInputEnvelope;
    connect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
};
export type QueueUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput> | Prisma.QueueCreateWithoutBusinessInput[] | Prisma.QueueUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutBusinessInput | Prisma.QueueCreateOrConnectWithoutBusinessInput[];
    createMany?: Prisma.QueueCreateManyBusinessInputEnvelope;
    connect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
};
export type QueueUpdateManyWithoutBusinessNestedInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput> | Prisma.QueueCreateWithoutBusinessInput[] | Prisma.QueueUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutBusinessInput | Prisma.QueueCreateOrConnectWithoutBusinessInput[];
    upsert?: Prisma.QueueUpsertWithWhereUniqueWithoutBusinessInput | Prisma.QueueUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: Prisma.QueueCreateManyBusinessInputEnvelope;
    set?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    disconnect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    delete?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    connect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    update?: Prisma.QueueUpdateWithWhereUniqueWithoutBusinessInput | Prisma.QueueUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?: Prisma.QueueUpdateManyWithWhereWithoutBusinessInput | Prisma.QueueUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: Prisma.QueueScalarWhereInput | Prisma.QueueScalarWhereInput[];
};
export type QueueUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput> | Prisma.QueueCreateWithoutBusinessInput[] | Prisma.QueueUncheckedCreateWithoutBusinessInput[];
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutBusinessInput | Prisma.QueueCreateOrConnectWithoutBusinessInput[];
    upsert?: Prisma.QueueUpsertWithWhereUniqueWithoutBusinessInput | Prisma.QueueUpsertWithWhereUniqueWithoutBusinessInput[];
    createMany?: Prisma.QueueCreateManyBusinessInputEnvelope;
    set?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    disconnect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    delete?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    connect?: Prisma.QueueWhereUniqueInput | Prisma.QueueWhereUniqueInput[];
    update?: Prisma.QueueUpdateWithWhereUniqueWithoutBusinessInput | Prisma.QueueUpdateWithWhereUniqueWithoutBusinessInput[];
    updateMany?: Prisma.QueueUpdateManyWithWhereWithoutBusinessInput | Prisma.QueueUpdateManyWithWhereWithoutBusinessInput[];
    deleteMany?: Prisma.QueueScalarWhereInput | Prisma.QueueScalarWhereInput[];
};
export type EnumQueueStatusFieldUpdateOperationsInput = {
    set?: $Enums.QueueStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type QueueCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutEntriesInput, Prisma.QueueUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.QueueWhereUniqueInput;
};
export type QueueUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.QueueCreateWithoutEntriesInput, Prisma.QueueUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.QueueCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.QueueUpsertWithoutEntriesInput;
    connect?: Prisma.QueueWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QueueUpdateToOneWithWhereWithoutEntriesInput, Prisma.QueueUpdateWithoutEntriesInput>, Prisma.QueueUncheckedUpdateWithoutEntriesInput>;
};
export type QueueCreateWithoutBusinessInput = {
    id?: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.QueueEntryCreateNestedManyWithoutQueueInput;
};
export type QueueUncheckedCreateWithoutBusinessInput = {
    id?: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.QueueEntryUncheckedCreateNestedManyWithoutQueueInput;
};
export type QueueCreateOrConnectWithoutBusinessInput = {
    where: Prisma.QueueWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput>;
};
export type QueueCreateManyBusinessInputEnvelope = {
    data: Prisma.QueueCreateManyBusinessInput | Prisma.QueueCreateManyBusinessInput[];
    skipDuplicates?: boolean;
};
export type QueueUpsertWithWhereUniqueWithoutBusinessInput = {
    where: Prisma.QueueWhereUniqueInput;
    update: Prisma.XOR<Prisma.QueueUpdateWithoutBusinessInput, Prisma.QueueUncheckedUpdateWithoutBusinessInput>;
    create: Prisma.XOR<Prisma.QueueCreateWithoutBusinessInput, Prisma.QueueUncheckedCreateWithoutBusinessInput>;
};
export type QueueUpdateWithWhereUniqueWithoutBusinessInput = {
    where: Prisma.QueueWhereUniqueInput;
    data: Prisma.XOR<Prisma.QueueUpdateWithoutBusinessInput, Prisma.QueueUncheckedUpdateWithoutBusinessInput>;
};
export type QueueUpdateManyWithWhereWithoutBusinessInput = {
    where: Prisma.QueueScalarWhereInput;
    data: Prisma.XOR<Prisma.QueueUpdateManyMutationInput, Prisma.QueueUncheckedUpdateManyWithoutBusinessInput>;
};
export type QueueScalarWhereInput = {
    AND?: Prisma.QueueScalarWhereInput | Prisma.QueueScalarWhereInput[];
    OR?: Prisma.QueueScalarWhereInput[];
    NOT?: Prisma.QueueScalarWhereInput | Prisma.QueueScalarWhereInput[];
    id?: Prisma.StringFilter<"Queue"> | string;
    businessId?: Prisma.StringFilter<"Queue"> | string;
    status?: Prisma.EnumQueueStatusFilter<"Queue"> | $Enums.QueueStatus;
    currentNumber?: Prisma.StringNullableFilter<"Queue"> | string | null;
    nextSequence?: Prisma.IntFilter<"Queue"> | number;
    averageServiceTimeMinutes?: Prisma.IntFilter<"Queue"> | number;
    openedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Queue"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Queue"> | Date | string;
};
export type QueueCreateWithoutEntriesInput = {
    id?: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    business: Prisma.BusinessCreateNestedOneWithoutQueuesInput;
};
export type QueueUncheckedCreateWithoutEntriesInput = {
    id?: string;
    businessId: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QueueCreateOrConnectWithoutEntriesInput = {
    where: Prisma.QueueWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueCreateWithoutEntriesInput, Prisma.QueueUncheckedCreateWithoutEntriesInput>;
};
export type QueueUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.QueueUpdateWithoutEntriesInput, Prisma.QueueUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.QueueCreateWithoutEntriesInput, Prisma.QueueUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.QueueWhereInput;
};
export type QueueUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.QueueWhereInput;
    data: Prisma.XOR<Prisma.QueueUpdateWithoutEntriesInput, Prisma.QueueUncheckedUpdateWithoutEntriesInput>;
};
export type QueueUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    business?: Prisma.BusinessUpdateOneRequiredWithoutQueuesNestedInput;
};
export type QueueUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    businessId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueCreateManyBusinessInput = {
    id?: string;
    status?: $Enums.QueueStatus;
    currentNumber?: string | null;
    nextSequence?: number;
    averageServiceTimeMinutes?: number;
    openedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QueueUpdateWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.QueueEntryUpdateManyWithoutQueueNestedInput;
};
export type QueueUncheckedUpdateWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.QueueEntryUncheckedUpdateManyWithoutQueueNestedInput;
};
export type QueueUncheckedUpdateManyWithoutBusinessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumQueueStatusFieldUpdateOperationsInput | $Enums.QueueStatus;
    currentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextSequence?: Prisma.IntFieldUpdateOperationsInput | number;
    averageServiceTimeMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    openedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QueueCountOutputType = {
    entries: number;
};
export type QueueCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entries?: boolean | QueueCountOutputTypeCountEntriesArgs;
};
export type QueueCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueCountOutputTypeSelect<ExtArgs> | null;
};
export type QueueCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueEntryWhereInput;
};
export type QueueSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    businessId?: boolean;
    status?: boolean;
    currentNumber?: boolean;
    nextSequence?: boolean;
    averageServiceTimeMinutes?: boolean;
    openedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    entries?: boolean | Prisma.Queue$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.QueueCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queue"]>;
export type QueueSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    businessId?: boolean;
    status?: boolean;
    currentNumber?: boolean;
    nextSequence?: boolean;
    averageServiceTimeMinutes?: boolean;
    openedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queue"]>;
export type QueueSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    businessId?: boolean;
    status?: boolean;
    currentNumber?: boolean;
    nextSequence?: boolean;
    averageServiceTimeMinutes?: boolean;
    openedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["queue"]>;
export type QueueSelectScalar = {
    id?: boolean;
    businessId?: boolean;
    status?: boolean;
    currentNumber?: boolean;
    nextSequence?: boolean;
    averageServiceTimeMinutes?: boolean;
    openedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type QueueOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "businessId" | "status" | "currentNumber" | "nextSequence" | "averageServiceTimeMinutes" | "openedAt" | "closedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["queue"]>;
export type QueueInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
    entries?: boolean | Prisma.Queue$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.QueueCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QueueIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
};
export type QueueIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    business?: boolean | Prisma.BusinessDefaultArgs<ExtArgs>;
};
export type $QueuePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Queue";
    objects: {
        business: Prisma.$BusinessPayload<ExtArgs>;
        entries: Prisma.$QueueEntryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        businessId: string;
        status: $Enums.QueueStatus;
        currentNumber: string | null;
        nextSequence: number;
        averageServiceTimeMinutes: number;
        openedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["queue"]>;
    composites: {};
};
export type QueueGetPayload<S extends boolean | null | undefined | QueueDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QueuePayload, S>;
export type QueueCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QueueCountAggregateInputType | true;
};
export interface QueueDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Queue'];
        meta: {
            name: 'Queue';
        };
    };
    findUnique<T extends QueueFindUniqueArgs>(args: Prisma.SelectSubset<T, QueueFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QueueFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QueueFindFirstArgs>(args?: Prisma.SelectSubset<T, QueueFindFirstArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QueueFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QueueFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QueueFindManyArgs>(args?: Prisma.SelectSubset<T, QueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QueueCreateArgs>(args: Prisma.SelectSubset<T, QueueCreateArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QueueCreateManyArgs>(args?: Prisma.SelectSubset<T, QueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QueueCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QueueDeleteArgs>(args: Prisma.SelectSubset<T, QueueDeleteArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QueueUpdateArgs>(args: Prisma.SelectSubset<T, QueueUpdateArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QueueDeleteManyArgs>(args?: Prisma.SelectSubset<T, QueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QueueUpdateManyArgs>(args: Prisma.SelectSubset<T, QueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QueueUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QueueUpsertArgs>(args: Prisma.SelectSubset<T, QueueUpsertArgs<ExtArgs>>): Prisma.Prisma__QueueClient<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QueueCountArgs>(args?: Prisma.Subset<T, QueueCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QueueCountAggregateOutputType> : number>;
    aggregate<T extends QueueAggregateArgs>(args: Prisma.Subset<T, QueueAggregateArgs>): Prisma.PrismaPromise<GetQueueAggregateType<T>>;
    groupBy<T extends QueueGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QueueGroupByArgs['orderBy'];
    } : {
        orderBy?: QueueGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QueueFieldRefs;
}
export interface Prisma__QueueClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    business<T extends Prisma.BusinessDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BusinessDefaultArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    entries<T extends Prisma.Queue$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Queue$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QueueFieldRefs {
    readonly id: Prisma.FieldRef<"Queue", 'String'>;
    readonly businessId: Prisma.FieldRef<"Queue", 'String'>;
    readonly status: Prisma.FieldRef<"Queue", 'QueueStatus'>;
    readonly currentNumber: Prisma.FieldRef<"Queue", 'String'>;
    readonly nextSequence: Prisma.FieldRef<"Queue", 'Int'>;
    readonly averageServiceTimeMinutes: Prisma.FieldRef<"Queue", 'Int'>;
    readonly openedAt: Prisma.FieldRef<"Queue", 'DateTime'>;
    readonly closedAt: Prisma.FieldRef<"Queue", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Queue", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Queue", 'DateTime'>;
}
export type QueueFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where: Prisma.QueueWhereUniqueInput;
};
export type QueueFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where: Prisma.QueueWhereUniqueInput;
};
export type QueueFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where?: Prisma.QueueWhereInput;
    orderBy?: Prisma.QueueOrderByWithRelationInput | Prisma.QueueOrderByWithRelationInput[];
    cursor?: Prisma.QueueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QueueScalarFieldEnum | Prisma.QueueScalarFieldEnum[];
};
export type QueueFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where?: Prisma.QueueWhereInput;
    orderBy?: Prisma.QueueOrderByWithRelationInput | Prisma.QueueOrderByWithRelationInput[];
    cursor?: Prisma.QueueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QueueScalarFieldEnum | Prisma.QueueScalarFieldEnum[];
};
export type QueueFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where?: Prisma.QueueWhereInput;
    orderBy?: Prisma.QueueOrderByWithRelationInput | Prisma.QueueOrderByWithRelationInput[];
    cursor?: Prisma.QueueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QueueScalarFieldEnum | Prisma.QueueScalarFieldEnum[];
};
export type QueueCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueCreateInput, Prisma.QueueUncheckedCreateInput>;
};
export type QueueCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QueueCreateManyInput | Prisma.QueueCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QueueCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    data: Prisma.QueueCreateManyInput | Prisma.QueueCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QueueIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QueueUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueUpdateInput, Prisma.QueueUncheckedUpdateInput>;
    where: Prisma.QueueWhereUniqueInput;
};
export type QueueUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QueueUpdateManyMutationInput, Prisma.QueueUncheckedUpdateManyInput>;
    where?: Prisma.QueueWhereInput;
    limit?: number;
};
export type QueueUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QueueUpdateManyMutationInput, Prisma.QueueUncheckedUpdateManyInput>;
    where?: Prisma.QueueWhereInput;
    limit?: number;
    include?: Prisma.QueueIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QueueUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where: Prisma.QueueWhereUniqueInput;
    create: Prisma.XOR<Prisma.QueueCreateInput, Prisma.QueueUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QueueUpdateInput, Prisma.QueueUncheckedUpdateInput>;
};
export type QueueDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
    where: Prisma.QueueWhereUniqueInput;
};
export type QueueDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueWhereInput;
    limit?: number;
};
export type Queue$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type QueueDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QueueSelect<ExtArgs> | null;
    omit?: Prisma.QueueOmit<ExtArgs> | null;
    include?: Prisma.QueueInclude<ExtArgs> | null;
};
