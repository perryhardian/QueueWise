import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BusinessModel = runtime.Types.Result.DefaultSelection<Prisma.$BusinessPayload>;
export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null;
    _avg: BusinessAvgAggregateOutputType | null;
    _sum: BusinessSumAggregateOutputType | null;
    _min: BusinessMinAggregateOutputType | null;
    _max: BusinessMaxAggregateOutputType | null;
};
export type BusinessAvgAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    rating: runtime.Decimal | null;
};
export type BusinessSumAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    rating: runtime.Decimal | null;
};
export type BusinessMinAggregateOutputType = {
    id: string | null;
    merchantId: string | null;
    categoryId: string | null;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    address: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    rating: runtime.Decimal | null;
    qrCodeToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BusinessMaxAggregateOutputType = {
    id: string | null;
    merchantId: string | null;
    categoryId: string | null;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    address: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    rating: runtime.Decimal | null;
    qrCodeToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BusinessCountAggregateOutputType = {
    id: number;
    merchantId: number;
    categoryId: number;
    name: number;
    description: number;
    imageUrl: number;
    address: number;
    latitude: number;
    longitude: number;
    openingHours: number;
    rating: number;
    qrCodeToken: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BusinessAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    rating?: true;
};
export type BusinessSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    rating?: true;
};
export type BusinessMinAggregateInputType = {
    id?: true;
    merchantId?: true;
    categoryId?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    rating?: true;
    qrCodeToken?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BusinessMaxAggregateInputType = {
    id?: true;
    merchantId?: true;
    categoryId?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    rating?: true;
    qrCodeToken?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BusinessCountAggregateInputType = {
    id?: true;
    merchantId?: true;
    categoryId?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    openingHours?: true;
    rating?: true;
    qrCodeToken?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BusinessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput | Prisma.BusinessOrderByWithRelationInput[];
    cursor?: Prisma.BusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BusinessCountAggregateInputType;
    _avg?: BusinessAvgAggregateInputType;
    _sum?: BusinessSumAggregateInputType;
    _min?: BusinessMinAggregateInputType;
    _max?: BusinessMaxAggregateInputType;
};
export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
    [P in keyof T & keyof AggregateBusiness]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBusiness[P]> : Prisma.GetScalarType<T[P], AggregateBusiness[P]>;
};
export type BusinessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithAggregationInput | Prisma.BusinessOrderByWithAggregationInput[];
    by: Prisma.BusinessScalarFieldEnum[] | Prisma.BusinessScalarFieldEnum;
    having?: Prisma.BusinessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BusinessCountAggregateInputType | true;
    _avg?: BusinessAvgAggregateInputType;
    _sum?: BusinessSumAggregateInputType;
    _min?: BusinessMinAggregateInputType;
    _max?: BusinessMaxAggregateInputType;
};
export type BusinessGroupByOutputType = {
    id: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    address: string;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    openingHours: runtime.JsonValue | null;
    rating: runtime.Decimal | null;
    qrCodeToken: string;
    createdAt: Date;
    updatedAt: Date;
    _count: BusinessCountAggregateOutputType | null;
    _avg: BusinessAvgAggregateOutputType | null;
    _sum: BusinessSumAggregateOutputType | null;
    _min: BusinessMinAggregateOutputType | null;
    _max: BusinessMaxAggregateOutputType | null;
};
export type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BusinessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BusinessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BusinessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BusinessGroupByOutputType[P]>;
}>>;
export type BusinessWhereInput = {
    AND?: Prisma.BusinessWhereInput | Prisma.BusinessWhereInput[];
    OR?: Prisma.BusinessWhereInput[];
    NOT?: Prisma.BusinessWhereInput | Prisma.BusinessWhereInput[];
    id?: Prisma.StringFilter<"Business"> | string;
    merchantId?: Prisma.StringFilter<"Business"> | string;
    categoryId?: Prisma.StringFilter<"Business"> | string;
    name?: Prisma.StringFilter<"Business"> | string;
    description?: Prisma.StringNullableFilter<"Business"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Business"> | string | null;
    address?: Prisma.StringFilter<"Business"> | string;
    latitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.JsonNullableFilter<"Business">;
    rating?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFilter<"Business"> | string;
    createdAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
    merchant?: Prisma.XOR<Prisma.MerchantScalarRelationFilter, Prisma.MerchantWhereInput>;
    category?: Prisma.XOR<Prisma.BusinessCategoryScalarRelationFilter, Prisma.BusinessCategoryWhereInput>;
    services?: Prisma.ServiceListRelationFilter;
    queues?: Prisma.QueueListRelationFilter;
    histories?: Prisma.QueueHistoryListRelationFilter;
};
export type BusinessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    openingHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrCodeToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    merchant?: Prisma.MerchantOrderByWithRelationInput;
    category?: Prisma.BusinessCategoryOrderByWithRelationInput;
    services?: Prisma.ServiceOrderByRelationAggregateInput;
    queues?: Prisma.QueueOrderByRelationAggregateInput;
    histories?: Prisma.QueueHistoryOrderByRelationAggregateInput;
};
export type BusinessWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    qrCodeToken?: string;
    AND?: Prisma.BusinessWhereInput | Prisma.BusinessWhereInput[];
    OR?: Prisma.BusinessWhereInput[];
    NOT?: Prisma.BusinessWhereInput | Prisma.BusinessWhereInput[];
    merchantId?: Prisma.StringFilter<"Business"> | string;
    categoryId?: Prisma.StringFilter<"Business"> | string;
    name?: Prisma.StringFilter<"Business"> | string;
    description?: Prisma.StringNullableFilter<"Business"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Business"> | string | null;
    address?: Prisma.StringFilter<"Business"> | string;
    latitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.JsonNullableFilter<"Business">;
    rating?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
    merchant?: Prisma.XOR<Prisma.MerchantScalarRelationFilter, Prisma.MerchantWhereInput>;
    category?: Prisma.XOR<Prisma.BusinessCategoryScalarRelationFilter, Prisma.BusinessCategoryWhereInput>;
    services?: Prisma.ServiceListRelationFilter;
    queues?: Prisma.QueueListRelationFilter;
    histories?: Prisma.QueueHistoryListRelationFilter;
}, "id" | "qrCodeToken">;
export type BusinessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    openingHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrCodeToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BusinessCountOrderByAggregateInput;
    _avg?: Prisma.BusinessAvgOrderByAggregateInput;
    _max?: Prisma.BusinessMaxOrderByAggregateInput;
    _min?: Prisma.BusinessMinOrderByAggregateInput;
    _sum?: Prisma.BusinessSumOrderByAggregateInput;
};
export type BusinessScalarWhereWithAggregatesInput = {
    AND?: Prisma.BusinessScalarWhereWithAggregatesInput | Prisma.BusinessScalarWhereWithAggregatesInput[];
    OR?: Prisma.BusinessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BusinessScalarWhereWithAggregatesInput | Prisma.BusinessScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    merchantId?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Business"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Business"> | string | null;
    address?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    latitude?: Prisma.DecimalNullableWithAggregatesFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableWithAggregatesFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.JsonNullableWithAggregatesFilter<"Business">;
    rating?: Prisma.DecimalNullableWithAggregatesFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringWithAggregatesFilter<"Business"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Business"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Business"> | Date | string;
};
export type BusinessCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant: Prisma.MerchantCreateNestedOneWithoutBusinessesInput;
    category: Prisma.BusinessCategoryCreateNestedOneWithoutBusinessesInput;
    services?: Prisma.ServiceCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateInput = {
    id?: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    services?: Prisma.ServiceUncheckedCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueUncheckedCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutBusinessesNestedInput;
    category?: Prisma.BusinessCategoryUpdateOneRequiredWithoutBusinessesNestedInput;
    services?: Prisma.ServiceUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    services?: Prisma.ServiceUncheckedUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUncheckedUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessCreateManyInput = {
    id?: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BusinessUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BusinessUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BusinessListRelationFilter = {
    every?: Prisma.BusinessWhereInput;
    some?: Prisma.BusinessWhereInput;
    none?: Prisma.BusinessWhereInput;
};
export type BusinessOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BusinessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    openingHours?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qrCodeToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BusinessAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type BusinessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qrCodeToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BusinessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    merchantId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    qrCodeToken?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BusinessSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type BusinessScalarRelationFilter = {
    is?: Prisma.BusinessWhereInput;
    isNot?: Prisma.BusinessWhereInput;
};
export type BusinessCreateNestedManyWithoutMerchantInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput> | Prisma.BusinessCreateWithoutMerchantInput[] | Prisma.BusinessUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutMerchantInput | Prisma.BusinessCreateOrConnectWithoutMerchantInput[];
    createMany?: Prisma.BusinessCreateManyMerchantInputEnvelope;
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
};
export type BusinessUncheckedCreateNestedManyWithoutMerchantInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput> | Prisma.BusinessCreateWithoutMerchantInput[] | Prisma.BusinessUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutMerchantInput | Prisma.BusinessCreateOrConnectWithoutMerchantInput[];
    createMany?: Prisma.BusinessCreateManyMerchantInputEnvelope;
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
};
export type BusinessUpdateManyWithoutMerchantNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput> | Prisma.BusinessCreateWithoutMerchantInput[] | Prisma.BusinessUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutMerchantInput | Prisma.BusinessCreateOrConnectWithoutMerchantInput[];
    upsert?: Prisma.BusinessUpsertWithWhereUniqueWithoutMerchantInput | Prisma.BusinessUpsertWithWhereUniqueWithoutMerchantInput[];
    createMany?: Prisma.BusinessCreateManyMerchantInputEnvelope;
    set?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    disconnect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    delete?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    update?: Prisma.BusinessUpdateWithWhereUniqueWithoutMerchantInput | Prisma.BusinessUpdateWithWhereUniqueWithoutMerchantInput[];
    updateMany?: Prisma.BusinessUpdateManyWithWhereWithoutMerchantInput | Prisma.BusinessUpdateManyWithWhereWithoutMerchantInput[];
    deleteMany?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
};
export type BusinessUncheckedUpdateManyWithoutMerchantNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput> | Prisma.BusinessCreateWithoutMerchantInput[] | Prisma.BusinessUncheckedCreateWithoutMerchantInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutMerchantInput | Prisma.BusinessCreateOrConnectWithoutMerchantInput[];
    upsert?: Prisma.BusinessUpsertWithWhereUniqueWithoutMerchantInput | Prisma.BusinessUpsertWithWhereUniqueWithoutMerchantInput[];
    createMany?: Prisma.BusinessCreateManyMerchantInputEnvelope;
    set?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    disconnect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    delete?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    update?: Prisma.BusinessUpdateWithWhereUniqueWithoutMerchantInput | Prisma.BusinessUpdateWithWhereUniqueWithoutMerchantInput[];
    updateMany?: Prisma.BusinessUpdateManyWithWhereWithoutMerchantInput | Prisma.BusinessUpdateManyWithWhereWithoutMerchantInput[];
    deleteMany?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
};
export type BusinessCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput> | Prisma.BusinessCreateWithoutCategoryInput[] | Prisma.BusinessUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutCategoryInput | Prisma.BusinessCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BusinessCreateManyCategoryInputEnvelope;
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
};
export type BusinessUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput> | Prisma.BusinessCreateWithoutCategoryInput[] | Prisma.BusinessUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutCategoryInput | Prisma.BusinessCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.BusinessCreateManyCategoryInputEnvelope;
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
};
export type BusinessUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput> | Prisma.BusinessCreateWithoutCategoryInput[] | Prisma.BusinessUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutCategoryInput | Prisma.BusinessCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BusinessUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BusinessUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BusinessCreateManyCategoryInputEnvelope;
    set?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    disconnect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    delete?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    update?: Prisma.BusinessUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BusinessUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BusinessUpdateManyWithWhereWithoutCategoryInput | Prisma.BusinessUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
};
export type BusinessUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput> | Prisma.BusinessCreateWithoutCategoryInput[] | Prisma.BusinessUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutCategoryInput | Prisma.BusinessCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.BusinessUpsertWithWhereUniqueWithoutCategoryInput | Prisma.BusinessUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.BusinessCreateManyCategoryInputEnvelope;
    set?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    disconnect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    delete?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    connect?: Prisma.BusinessWhereUniqueInput | Prisma.BusinessWhereUniqueInput[];
    update?: Prisma.BusinessUpdateWithWhereUniqueWithoutCategoryInput | Prisma.BusinessUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.BusinessUpdateManyWithWhereWithoutCategoryInput | Prisma.BusinessUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BusinessCreateNestedOneWithoutServicesInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutServicesInput, Prisma.BusinessUncheckedCreateWithoutServicesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutServicesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
};
export type BusinessUpdateOneRequiredWithoutServicesNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutServicesInput, Prisma.BusinessUncheckedCreateWithoutServicesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutServicesInput;
    upsert?: Prisma.BusinessUpsertWithoutServicesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BusinessUpdateToOneWithWhereWithoutServicesInput, Prisma.BusinessUpdateWithoutServicesInput>, Prisma.BusinessUncheckedUpdateWithoutServicesInput>;
};
export type BusinessCreateNestedOneWithoutQueuesInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutQueuesInput, Prisma.BusinessUncheckedCreateWithoutQueuesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutQueuesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
};
export type BusinessUpdateOneRequiredWithoutQueuesNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutQueuesInput, Prisma.BusinessUncheckedCreateWithoutQueuesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutQueuesInput;
    upsert?: Prisma.BusinessUpsertWithoutQueuesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BusinessUpdateToOneWithWhereWithoutQueuesInput, Prisma.BusinessUpdateWithoutQueuesInput>, Prisma.BusinessUncheckedUpdateWithoutQueuesInput>;
};
export type BusinessCreateNestedOneWithoutHistoriesInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutHistoriesInput, Prisma.BusinessUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutHistoriesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
};
export type BusinessUpdateOneRequiredWithoutHistoriesNestedInput = {
    create?: Prisma.XOR<Prisma.BusinessCreateWithoutHistoriesInput, Prisma.BusinessUncheckedCreateWithoutHistoriesInput>;
    connectOrCreate?: Prisma.BusinessCreateOrConnectWithoutHistoriesInput;
    upsert?: Prisma.BusinessUpsertWithoutHistoriesInput;
    connect?: Prisma.BusinessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BusinessUpdateToOneWithWhereWithoutHistoriesInput, Prisma.BusinessUpdateWithoutHistoriesInput>, Prisma.BusinessUncheckedUpdateWithoutHistoriesInput>;
};
export type BusinessCreateWithoutMerchantInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.BusinessCategoryCreateNestedOneWithoutBusinessesInput;
    services?: Prisma.ServiceCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateWithoutMerchantInput = {
    id?: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    services?: Prisma.ServiceUncheckedCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueUncheckedCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessCreateOrConnectWithoutMerchantInput = {
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput>;
};
export type BusinessCreateManyMerchantInputEnvelope = {
    data: Prisma.BusinessCreateManyMerchantInput | Prisma.BusinessCreateManyMerchantInput[];
    skipDuplicates?: boolean;
};
export type BusinessUpsertWithWhereUniqueWithoutMerchantInput = {
    where: Prisma.BusinessWhereUniqueInput;
    update: Prisma.XOR<Prisma.BusinessUpdateWithoutMerchantInput, Prisma.BusinessUncheckedUpdateWithoutMerchantInput>;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutMerchantInput, Prisma.BusinessUncheckedCreateWithoutMerchantInput>;
};
export type BusinessUpdateWithWhereUniqueWithoutMerchantInput = {
    where: Prisma.BusinessWhereUniqueInput;
    data: Prisma.XOR<Prisma.BusinessUpdateWithoutMerchantInput, Prisma.BusinessUncheckedUpdateWithoutMerchantInput>;
};
export type BusinessUpdateManyWithWhereWithoutMerchantInput = {
    where: Prisma.BusinessScalarWhereInput;
    data: Prisma.XOR<Prisma.BusinessUpdateManyMutationInput, Prisma.BusinessUncheckedUpdateManyWithoutMerchantInput>;
};
export type BusinessScalarWhereInput = {
    AND?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
    OR?: Prisma.BusinessScalarWhereInput[];
    NOT?: Prisma.BusinessScalarWhereInput | Prisma.BusinessScalarWhereInput[];
    id?: Prisma.StringFilter<"Business"> | string;
    merchantId?: Prisma.StringFilter<"Business"> | string;
    categoryId?: Prisma.StringFilter<"Business"> | string;
    name?: Prisma.StringFilter<"Business"> | string;
    description?: Prisma.StringNullableFilter<"Business"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Business"> | string | null;
    address?: Prisma.StringFilter<"Business"> | string;
    latitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.JsonNullableFilter<"Business">;
    rating?: Prisma.DecimalNullableFilter<"Business"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFilter<"Business"> | string;
    createdAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Business"> | Date | string;
};
export type BusinessCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant: Prisma.MerchantCreateNestedOneWithoutBusinessesInput;
    services?: Prisma.ServiceCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateWithoutCategoryInput = {
    id?: string;
    merchantId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    services?: Prisma.ServiceUncheckedCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueUncheckedCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessCreateOrConnectWithoutCategoryInput = {
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput>;
};
export type BusinessCreateManyCategoryInputEnvelope = {
    data: Prisma.BusinessCreateManyCategoryInput | Prisma.BusinessCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type BusinessUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BusinessWhereUniqueInput;
    update: Prisma.XOR<Prisma.BusinessUpdateWithoutCategoryInput, Prisma.BusinessUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutCategoryInput, Prisma.BusinessUncheckedCreateWithoutCategoryInput>;
};
export type BusinessUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.BusinessWhereUniqueInput;
    data: Prisma.XOR<Prisma.BusinessUpdateWithoutCategoryInput, Prisma.BusinessUncheckedUpdateWithoutCategoryInput>;
};
export type BusinessUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.BusinessScalarWhereInput;
    data: Prisma.XOR<Prisma.BusinessUpdateManyMutationInput, Prisma.BusinessUncheckedUpdateManyWithoutCategoryInput>;
};
export type BusinessCreateWithoutServicesInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant: Prisma.MerchantCreateNestedOneWithoutBusinessesInput;
    category: Prisma.BusinessCategoryCreateNestedOneWithoutBusinessesInput;
    queues?: Prisma.QueueCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateWithoutServicesInput = {
    id?: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    queues?: Prisma.QueueUncheckedCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessCreateOrConnectWithoutServicesInput = {
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutServicesInput, Prisma.BusinessUncheckedCreateWithoutServicesInput>;
};
export type BusinessUpsertWithoutServicesInput = {
    update: Prisma.XOR<Prisma.BusinessUpdateWithoutServicesInput, Prisma.BusinessUncheckedUpdateWithoutServicesInput>;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutServicesInput, Prisma.BusinessUncheckedCreateWithoutServicesInput>;
    where?: Prisma.BusinessWhereInput;
};
export type BusinessUpdateToOneWithWhereWithoutServicesInput = {
    where?: Prisma.BusinessWhereInput;
    data: Prisma.XOR<Prisma.BusinessUpdateWithoutServicesInput, Prisma.BusinessUncheckedUpdateWithoutServicesInput>;
};
export type BusinessUpdateWithoutServicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutBusinessesNestedInput;
    category?: Prisma.BusinessCategoryUpdateOneRequiredWithoutBusinessesNestedInput;
    queues?: Prisma.QueueUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateWithoutServicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    queues?: Prisma.QueueUncheckedUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessCreateWithoutQueuesInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant: Prisma.MerchantCreateNestedOneWithoutBusinessesInput;
    category: Prisma.BusinessCategoryCreateNestedOneWithoutBusinessesInput;
    services?: Prisma.ServiceCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateWithoutQueuesInput = {
    id?: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    services?: Prisma.ServiceUncheckedCreateNestedManyWithoutBusinessInput;
    histories?: Prisma.QueueHistoryUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessCreateOrConnectWithoutQueuesInput = {
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutQueuesInput, Prisma.BusinessUncheckedCreateWithoutQueuesInput>;
};
export type BusinessUpsertWithoutQueuesInput = {
    update: Prisma.XOR<Prisma.BusinessUpdateWithoutQueuesInput, Prisma.BusinessUncheckedUpdateWithoutQueuesInput>;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutQueuesInput, Prisma.BusinessUncheckedCreateWithoutQueuesInput>;
    where?: Prisma.BusinessWhereInput;
};
export type BusinessUpdateToOneWithWhereWithoutQueuesInput = {
    where?: Prisma.BusinessWhereInput;
    data: Prisma.XOR<Prisma.BusinessUpdateWithoutQueuesInput, Prisma.BusinessUncheckedUpdateWithoutQueuesInput>;
};
export type BusinessUpdateWithoutQueuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutBusinessesNestedInput;
    category?: Prisma.BusinessCategoryUpdateOneRequiredWithoutBusinessesNestedInput;
    services?: Prisma.ServiceUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateWithoutQueuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    services?: Prisma.ServiceUncheckedUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessCreateWithoutHistoriesInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    merchant: Prisma.MerchantCreateNestedOneWithoutBusinessesInput;
    category: Prisma.BusinessCategoryCreateNestedOneWithoutBusinessesInput;
    services?: Prisma.ServiceCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueCreateNestedManyWithoutBusinessInput;
};
export type BusinessUncheckedCreateWithoutHistoriesInput = {
    id?: string;
    merchantId: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    services?: Prisma.ServiceUncheckedCreateNestedManyWithoutBusinessInput;
    queues?: Prisma.QueueUncheckedCreateNestedManyWithoutBusinessInput;
};
export type BusinessCreateOrConnectWithoutHistoriesInput = {
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutHistoriesInput, Prisma.BusinessUncheckedCreateWithoutHistoriesInput>;
};
export type BusinessUpsertWithoutHistoriesInput = {
    update: Prisma.XOR<Prisma.BusinessUpdateWithoutHistoriesInput, Prisma.BusinessUncheckedUpdateWithoutHistoriesInput>;
    create: Prisma.XOR<Prisma.BusinessCreateWithoutHistoriesInput, Prisma.BusinessUncheckedCreateWithoutHistoriesInput>;
    where?: Prisma.BusinessWhereInput;
};
export type BusinessUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: Prisma.BusinessWhereInput;
    data: Prisma.XOR<Prisma.BusinessUpdateWithoutHistoriesInput, Prisma.BusinessUncheckedUpdateWithoutHistoriesInput>;
};
export type BusinessUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutBusinessesNestedInput;
    category?: Prisma.BusinessCategoryUpdateOneRequiredWithoutBusinessesNestedInput;
    services?: Prisma.ServiceUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateWithoutHistoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    services?: Prisma.ServiceUncheckedUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessCreateManyMerchantInput = {
    id?: string;
    categoryId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BusinessUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.BusinessCategoryUpdateOneRequiredWithoutBusinessesNestedInput;
    services?: Prisma.ServiceUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    services?: Prisma.ServiceUncheckedUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUncheckedUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateManyWithoutMerchantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BusinessCreateManyCategoryInput = {
    id?: string;
    merchantId: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address: string;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BusinessUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    merchant?: Prisma.MerchantUpdateOneRequiredWithoutBusinessesNestedInput;
    services?: Prisma.ServiceUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    services?: Prisma.ServiceUncheckedUpdateManyWithoutBusinessNestedInput;
    queues?: Prisma.QueueUncheckedUpdateManyWithoutBusinessNestedInput;
    histories?: Prisma.QueueHistoryUncheckedUpdateManyWithoutBusinessNestedInput;
};
export type BusinessUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    merchantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    rating?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    qrCodeToken?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BusinessCountOutputType = {
    services: number;
    queues: number;
    histories: number;
};
export type BusinessCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    services?: boolean | BusinessCountOutputTypeCountServicesArgs;
    queues?: boolean | BusinessCountOutputTypeCountQueuesArgs;
    histories?: boolean | BusinessCountOutputTypeCountHistoriesArgs;
};
export type BusinessCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessCountOutputTypeSelect<ExtArgs> | null;
};
export type BusinessCountOutputTypeCountServicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ServiceWhereInput;
};
export type BusinessCountOutputTypeCountQueuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueWhereInput;
};
export type BusinessCountOutputTypeCountHistoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QueueHistoryWhereInput;
};
export type BusinessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    merchantId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    openingHours?: boolean;
    rating?: boolean;
    qrCodeToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
    services?: boolean | Prisma.Business$servicesArgs<ExtArgs>;
    queues?: boolean | Prisma.Business$queuesArgs<ExtArgs>;
    histories?: boolean | Prisma.Business$historiesArgs<ExtArgs>;
    _count?: boolean | Prisma.BusinessCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["business"]>;
export type BusinessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    merchantId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    openingHours?: boolean;
    rating?: boolean;
    qrCodeToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["business"]>;
export type BusinessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    merchantId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    openingHours?: boolean;
    rating?: boolean;
    qrCodeToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["business"]>;
export type BusinessSelectScalar = {
    id?: boolean;
    merchantId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    openingHours?: boolean;
    rating?: boolean;
    qrCodeToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BusinessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "merchantId" | "categoryId" | "name" | "description" | "imageUrl" | "address" | "latitude" | "longitude" | "openingHours" | "rating" | "qrCodeToken" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>;
export type BusinessInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
    services?: boolean | Prisma.Business$servicesArgs<ExtArgs>;
    queues?: boolean | Prisma.Business$queuesArgs<ExtArgs>;
    histories?: boolean | Prisma.Business$historiesArgs<ExtArgs>;
    _count?: boolean | Prisma.BusinessCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BusinessIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
};
export type BusinessIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    merchant?: boolean | Prisma.MerchantDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.BusinessCategoryDefaultArgs<ExtArgs>;
};
export type $BusinessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Business";
    objects: {
        merchant: Prisma.$MerchantPayload<ExtArgs>;
        category: Prisma.$BusinessCategoryPayload<ExtArgs>;
        services: Prisma.$ServicePayload<ExtArgs>[];
        queues: Prisma.$QueuePayload<ExtArgs>[];
        histories: Prisma.$QueueHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        merchantId: string;
        categoryId: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        address: string;
        latitude: runtime.Decimal | null;
        longitude: runtime.Decimal | null;
        openingHours: runtime.JsonValue | null;
        rating: runtime.Decimal | null;
        qrCodeToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["business"]>;
    composites: {};
};
export type BusinessGetPayload<S extends boolean | null | undefined | BusinessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BusinessPayload, S>;
export type BusinessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BusinessCountAggregateInputType | true;
};
export interface BusinessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Business'];
        meta: {
            name: 'Business';
        };
    };
    findUnique<T extends BusinessFindUniqueArgs>(args: Prisma.SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BusinessFindFirstArgs>(args?: Prisma.SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BusinessFindManyArgs>(args?: Prisma.SelectSubset<T, BusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BusinessCreateArgs>(args: Prisma.SelectSubset<T, BusinessCreateArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BusinessCreateManyArgs>(args?: Prisma.SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BusinessDeleteArgs>(args: Prisma.SelectSubset<T, BusinessDeleteArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BusinessUpdateArgs>(args: Prisma.SelectSubset<T, BusinessUpdateArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BusinessDeleteManyArgs>(args?: Prisma.SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BusinessUpdateManyArgs>(args: Prisma.SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BusinessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BusinessUpsertArgs>(args: Prisma.SelectSubset<T, BusinessUpsertArgs<ExtArgs>>): Prisma.Prisma__BusinessClient<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BusinessCountArgs>(args?: Prisma.Subset<T, BusinessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BusinessCountAggregateOutputType> : number>;
    aggregate<T extends BusinessAggregateArgs>(args: Prisma.Subset<T, BusinessAggregateArgs>): Prisma.PrismaPromise<GetBusinessAggregateType<T>>;
    groupBy<T extends BusinessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BusinessGroupByArgs['orderBy'];
    } : {
        orderBy?: BusinessGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BusinessFieldRefs;
}
export interface Prisma__BusinessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    merchant<T extends Prisma.MerchantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MerchantDefaultArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.BusinessCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BusinessCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__BusinessCategoryClient<runtime.Types.Result.GetResult<Prisma.$BusinessCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    services<T extends Prisma.Business$servicesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Business$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    queues<T extends Prisma.Business$queuesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Business$queuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    histories<T extends Prisma.Business$historiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Business$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QueueHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BusinessFieldRefs {
    readonly id: Prisma.FieldRef<"Business", 'String'>;
    readonly merchantId: Prisma.FieldRef<"Business", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Business", 'String'>;
    readonly name: Prisma.FieldRef<"Business", 'String'>;
    readonly description: Prisma.FieldRef<"Business", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Business", 'String'>;
    readonly address: Prisma.FieldRef<"Business", 'String'>;
    readonly latitude: Prisma.FieldRef<"Business", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"Business", 'Decimal'>;
    readonly openingHours: Prisma.FieldRef<"Business", 'Json'>;
    readonly rating: Prisma.FieldRef<"Business", 'Decimal'>;
    readonly qrCodeToken: Prisma.FieldRef<"Business", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Business", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Business", 'DateTime'>;
}
export type BusinessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where: Prisma.BusinessWhereUniqueInput;
};
export type BusinessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where: Prisma.BusinessWhereUniqueInput;
};
export type BusinessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput | Prisma.BusinessOrderByWithRelationInput[];
    cursor?: Prisma.BusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BusinessScalarFieldEnum | Prisma.BusinessScalarFieldEnum[];
};
export type BusinessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput | Prisma.BusinessOrderByWithRelationInput[];
    cursor?: Prisma.BusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BusinessScalarFieldEnum | Prisma.BusinessScalarFieldEnum[];
};
export type BusinessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput | Prisma.BusinessOrderByWithRelationInput[];
    cursor?: Prisma.BusinessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BusinessScalarFieldEnum | Prisma.BusinessScalarFieldEnum[];
};
export type BusinessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BusinessCreateInput, Prisma.BusinessUncheckedCreateInput>;
};
export type BusinessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BusinessCreateManyInput | Prisma.BusinessCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BusinessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    data: Prisma.BusinessCreateManyInput | Prisma.BusinessCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BusinessIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BusinessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BusinessUpdateInput, Prisma.BusinessUncheckedUpdateInput>;
    where: Prisma.BusinessWhereUniqueInput;
};
export type BusinessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BusinessUpdateManyMutationInput, Prisma.BusinessUncheckedUpdateManyInput>;
    where?: Prisma.BusinessWhereInput;
    limit?: number;
};
export type BusinessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BusinessUpdateManyMutationInput, Prisma.BusinessUncheckedUpdateManyInput>;
    where?: Prisma.BusinessWhereInput;
    limit?: number;
    include?: Prisma.BusinessIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BusinessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where: Prisma.BusinessWhereUniqueInput;
    create: Prisma.XOR<Prisma.BusinessCreateInput, Prisma.BusinessUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BusinessUpdateInput, Prisma.BusinessUncheckedUpdateInput>;
};
export type BusinessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
    where: Prisma.BusinessWhereUniqueInput;
};
export type BusinessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BusinessWhereInput;
    limit?: number;
};
export type Business$servicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ServiceSelect<ExtArgs> | null;
    omit?: Prisma.ServiceOmit<ExtArgs> | null;
    include?: Prisma.ServiceInclude<ExtArgs> | null;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput | Prisma.ServiceOrderByWithRelationInput[];
    cursor?: Prisma.ServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ServiceScalarFieldEnum | Prisma.ServiceScalarFieldEnum[];
};
export type Business$queuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Business$historiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BusinessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BusinessSelect<ExtArgs> | null;
    omit?: Prisma.BusinessOmit<ExtArgs> | null;
    include?: Prisma.BusinessInclude<ExtArgs> | null;
};
