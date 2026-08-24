import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MerchantModel = runtime.Types.Result.DefaultSelection<Prisma.$MerchantPayload>;
export type AggregateMerchant = {
    _count: MerchantCountAggregateOutputType | null;
    _min: MerchantMinAggregateOutputType | null;
    _max: MerchantMaxAggregateOutputType | null;
};
export type MerchantMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MerchantMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    displayName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MerchantCountAggregateOutputType = {
    id: number;
    userId: number;
    displayName: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MerchantMinAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MerchantMaxAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MerchantCountAggregateInputType = {
    id?: true;
    userId?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MerchantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchantWhereInput;
    orderBy?: Prisma.MerchantOrderByWithRelationInput | Prisma.MerchantOrderByWithRelationInput[];
    cursor?: Prisma.MerchantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MerchantCountAggregateInputType;
    _min?: MerchantMinAggregateInputType;
    _max?: MerchantMaxAggregateInputType;
};
export type GetMerchantAggregateType<T extends MerchantAggregateArgs> = {
    [P in keyof T & keyof AggregateMerchant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMerchant[P]> : Prisma.GetScalarType<T[P], AggregateMerchant[P]>;
};
export type MerchantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchantWhereInput;
    orderBy?: Prisma.MerchantOrderByWithAggregationInput | Prisma.MerchantOrderByWithAggregationInput[];
    by: Prisma.MerchantScalarFieldEnum[] | Prisma.MerchantScalarFieldEnum;
    having?: Prisma.MerchantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MerchantCountAggregateInputType | true;
    _min?: MerchantMinAggregateInputType;
    _max?: MerchantMaxAggregateInputType;
};
export type MerchantGroupByOutputType = {
    id: string;
    userId: string;
    displayName: string;
    createdAt: Date;
    updatedAt: Date;
    _count: MerchantCountAggregateOutputType | null;
    _min: MerchantMinAggregateOutputType | null;
    _max: MerchantMaxAggregateOutputType | null;
};
export type GetMerchantGroupByPayload<T extends MerchantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MerchantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MerchantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MerchantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MerchantGroupByOutputType[P]>;
}>>;
export type MerchantWhereInput = {
    AND?: Prisma.MerchantWhereInput | Prisma.MerchantWhereInput[];
    OR?: Prisma.MerchantWhereInput[];
    NOT?: Prisma.MerchantWhereInput | Prisma.MerchantWhereInput[];
    id?: Prisma.StringFilter<"Merchant"> | string;
    userId?: Prisma.StringFilter<"Merchant"> | string;
    displayName?: Prisma.StringFilter<"Merchant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Merchant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Merchant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    businesses?: Prisma.BusinessListRelationFilter;
};
export type MerchantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    businesses?: Prisma.BusinessOrderByRelationAggregateInput;
};
export type MerchantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.MerchantWhereInput | Prisma.MerchantWhereInput[];
    OR?: Prisma.MerchantWhereInput[];
    NOT?: Prisma.MerchantWhereInput | Prisma.MerchantWhereInput[];
    displayName?: Prisma.StringFilter<"Merchant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Merchant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Merchant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    businesses?: Prisma.BusinessListRelationFilter;
}, "id" | "userId">;
export type MerchantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MerchantCountOrderByAggregateInput;
    _max?: Prisma.MerchantMaxOrderByAggregateInput;
    _min?: Prisma.MerchantMinOrderByAggregateInput;
};
export type MerchantScalarWhereWithAggregatesInput = {
    AND?: Prisma.MerchantScalarWhereWithAggregatesInput | Prisma.MerchantScalarWhereWithAggregatesInput[];
    OR?: Prisma.MerchantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MerchantScalarWhereWithAggregatesInput | Prisma.MerchantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Merchant"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Merchant"> | string;
    displayName?: Prisma.StringWithAggregatesFilter<"Merchant"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Merchant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Merchant"> | Date | string;
};
export type MerchantCreateInput = {
    id?: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMerchantInput;
    businesses?: Prisma.BusinessCreateNestedManyWithoutMerchantInput;
};
export type MerchantUncheckedCreateInput = {
    id?: string;
    userId: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    businesses?: Prisma.BusinessUncheckedCreateNestedManyWithoutMerchantInput;
};
export type MerchantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMerchantNestedInput;
    businesses?: Prisma.BusinessUpdateManyWithoutMerchantNestedInput;
};
export type MerchantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    businesses?: Prisma.BusinessUncheckedUpdateManyWithoutMerchantNestedInput;
};
export type MerchantCreateManyInput = {
    id?: string;
    userId: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MerchantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchantNullableScalarRelationFilter = {
    is?: Prisma.MerchantWhereInput | null;
    isNot?: Prisma.MerchantWhereInput | null;
};
export type MerchantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MerchantScalarRelationFilter = {
    is?: Prisma.MerchantWhereInput;
    isNot?: Prisma.MerchantWhereInput;
};
export type MerchantCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutUserInput;
    connect?: Prisma.MerchantWhereUniqueInput;
};
export type MerchantUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutUserInput;
    connect?: Prisma.MerchantWhereUniqueInput;
};
export type MerchantUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutUserInput;
    upsert?: Prisma.MerchantUpsertWithoutUserInput;
    disconnect?: Prisma.MerchantWhereInput | boolean;
    delete?: Prisma.MerchantWhereInput | boolean;
    connect?: Prisma.MerchantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MerchantUpdateToOneWithWhereWithoutUserInput, Prisma.MerchantUpdateWithoutUserInput>, Prisma.MerchantUncheckedUpdateWithoutUserInput>;
};
export type MerchantUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutUserInput;
    upsert?: Prisma.MerchantUpsertWithoutUserInput;
    disconnect?: Prisma.MerchantWhereInput | boolean;
    delete?: Prisma.MerchantWhereInput | boolean;
    connect?: Prisma.MerchantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MerchantUpdateToOneWithWhereWithoutUserInput, Prisma.MerchantUpdateWithoutUserInput>, Prisma.MerchantUncheckedUpdateWithoutUserInput>;
};
export type MerchantCreateNestedOneWithoutBusinessesInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutBusinessesInput, Prisma.MerchantUncheckedCreateWithoutBusinessesInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutBusinessesInput;
    connect?: Prisma.MerchantWhereUniqueInput;
};
export type MerchantUpdateOneRequiredWithoutBusinessesNestedInput = {
    create?: Prisma.XOR<Prisma.MerchantCreateWithoutBusinessesInput, Prisma.MerchantUncheckedCreateWithoutBusinessesInput>;
    connectOrCreate?: Prisma.MerchantCreateOrConnectWithoutBusinessesInput;
    upsert?: Prisma.MerchantUpsertWithoutBusinessesInput;
    connect?: Prisma.MerchantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MerchantUpdateToOneWithWhereWithoutBusinessesInput, Prisma.MerchantUpdateWithoutBusinessesInput>, Prisma.MerchantUncheckedUpdateWithoutBusinessesInput>;
};
export type MerchantCreateWithoutUserInput = {
    id?: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    businesses?: Prisma.BusinessCreateNestedManyWithoutMerchantInput;
};
export type MerchantUncheckedCreateWithoutUserInput = {
    id?: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    businesses?: Prisma.BusinessUncheckedCreateNestedManyWithoutMerchantInput;
};
export type MerchantCreateOrConnectWithoutUserInput = {
    where: Prisma.MerchantWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
};
export type MerchantUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.MerchantUpdateWithoutUserInput, Prisma.MerchantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.MerchantCreateWithoutUserInput, Prisma.MerchantUncheckedCreateWithoutUserInput>;
    where?: Prisma.MerchantWhereInput;
};
export type MerchantUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.MerchantWhereInput;
    data: Prisma.XOR<Prisma.MerchantUpdateWithoutUserInput, Prisma.MerchantUncheckedUpdateWithoutUserInput>;
};
export type MerchantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    businesses?: Prisma.BusinessUpdateManyWithoutMerchantNestedInput;
};
export type MerchantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    businesses?: Prisma.BusinessUncheckedUpdateManyWithoutMerchantNestedInput;
};
export type MerchantCreateWithoutBusinessesInput = {
    id?: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMerchantInput;
};
export type MerchantUncheckedCreateWithoutBusinessesInput = {
    id?: string;
    userId: string;
    displayName: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MerchantCreateOrConnectWithoutBusinessesInput = {
    where: Prisma.MerchantWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchantCreateWithoutBusinessesInput, Prisma.MerchantUncheckedCreateWithoutBusinessesInput>;
};
export type MerchantUpsertWithoutBusinessesInput = {
    update: Prisma.XOR<Prisma.MerchantUpdateWithoutBusinessesInput, Prisma.MerchantUncheckedUpdateWithoutBusinessesInput>;
    create: Prisma.XOR<Prisma.MerchantCreateWithoutBusinessesInput, Prisma.MerchantUncheckedCreateWithoutBusinessesInput>;
    where?: Prisma.MerchantWhereInput;
};
export type MerchantUpdateToOneWithWhereWithoutBusinessesInput = {
    where?: Prisma.MerchantWhereInput;
    data: Prisma.XOR<Prisma.MerchantUpdateWithoutBusinessesInput, Prisma.MerchantUncheckedUpdateWithoutBusinessesInput>;
};
export type MerchantUpdateWithoutBusinessesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMerchantNestedInput;
};
export type MerchantUncheckedUpdateWithoutBusinessesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MerchantCountOutputType = {
    businesses: number;
};
export type MerchantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    businesses?: boolean | MerchantCountOutputTypeCountBusinessesArgs;
};
export type MerchantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantCountOutputTypeSelect<ExtArgs> | null;
};
export type MerchantCountOutputTypeCountBusinessesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BusinessWhereInput;
};
export type MerchantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    businesses?: boolean | Prisma.Merchant$businessesArgs<ExtArgs>;
    _count?: boolean | Prisma.MerchantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchant"]>;
export type MerchantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchant"]>;
export type MerchantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["merchant"]>;
export type MerchantSelectScalar = {
    id?: boolean;
    userId?: boolean;
    displayName?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MerchantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "displayName" | "createdAt" | "updatedAt", ExtArgs["result"]["merchant"]>;
export type MerchantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    businesses?: boolean | Prisma.Merchant$businessesArgs<ExtArgs>;
    _count?: boolean | Prisma.MerchantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MerchantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MerchantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MerchantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Merchant";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        businesses: Prisma.$BusinessPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        displayName: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["merchant"]>;
    composites: {};
};
export type MerchantGetPayload<S extends boolean | null | undefined | MerchantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MerchantPayload, S>;
export type MerchantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MerchantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MerchantCountAggregateInputType | true;
};
export interface MerchantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Merchant'];
        meta: {
            name: 'Merchant';
        };
    };
    findUnique<T extends MerchantFindUniqueArgs>(args: Prisma.SelectSubset<T, MerchantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MerchantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MerchantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MerchantFindFirstArgs>(args?: Prisma.SelectSubset<T, MerchantFindFirstArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MerchantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MerchantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MerchantFindManyArgs>(args?: Prisma.SelectSubset<T, MerchantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MerchantCreateArgs>(args: Prisma.SelectSubset<T, MerchantCreateArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MerchantCreateManyArgs>(args?: Prisma.SelectSubset<T, MerchantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MerchantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MerchantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MerchantDeleteArgs>(args: Prisma.SelectSubset<T, MerchantDeleteArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MerchantUpdateArgs>(args: Prisma.SelectSubset<T, MerchantUpdateArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MerchantDeleteManyArgs>(args?: Prisma.SelectSubset<T, MerchantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MerchantUpdateManyArgs>(args: Prisma.SelectSubset<T, MerchantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MerchantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MerchantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MerchantUpsertArgs>(args: Prisma.SelectSubset<T, MerchantUpsertArgs<ExtArgs>>): Prisma.Prisma__MerchantClient<runtime.Types.Result.GetResult<Prisma.$MerchantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MerchantCountArgs>(args?: Prisma.Subset<T, MerchantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MerchantCountAggregateOutputType> : number>;
    aggregate<T extends MerchantAggregateArgs>(args: Prisma.Subset<T, MerchantAggregateArgs>): Prisma.PrismaPromise<GetMerchantAggregateType<T>>;
    groupBy<T extends MerchantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MerchantGroupByArgs['orderBy'];
    } : {
        orderBy?: MerchantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MerchantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMerchantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MerchantFieldRefs;
}
export interface Prisma__MerchantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    businesses<T extends Prisma.Merchant$businessesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Merchant$businessesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MerchantFieldRefs {
    readonly id: Prisma.FieldRef<"Merchant", 'String'>;
    readonly userId: Prisma.FieldRef<"Merchant", 'String'>;
    readonly displayName: Prisma.FieldRef<"Merchant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Merchant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Merchant", 'DateTime'>;
}
export type MerchantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where: Prisma.MerchantWhereUniqueInput;
};
export type MerchantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where: Prisma.MerchantWhereUniqueInput;
};
export type MerchantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where?: Prisma.MerchantWhereInput;
    orderBy?: Prisma.MerchantOrderByWithRelationInput | Prisma.MerchantOrderByWithRelationInput[];
    cursor?: Prisma.MerchantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MerchantScalarFieldEnum | Prisma.MerchantScalarFieldEnum[];
};
export type MerchantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where?: Prisma.MerchantWhereInput;
    orderBy?: Prisma.MerchantOrderByWithRelationInput | Prisma.MerchantOrderByWithRelationInput[];
    cursor?: Prisma.MerchantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MerchantScalarFieldEnum | Prisma.MerchantScalarFieldEnum[];
};
export type MerchantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where?: Prisma.MerchantWhereInput;
    orderBy?: Prisma.MerchantOrderByWithRelationInput | Prisma.MerchantOrderByWithRelationInput[];
    cursor?: Prisma.MerchantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MerchantScalarFieldEnum | Prisma.MerchantScalarFieldEnum[];
};
export type MerchantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MerchantCreateInput, Prisma.MerchantUncheckedCreateInput>;
};
export type MerchantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MerchantCreateManyInput | Prisma.MerchantCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MerchantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    data: Prisma.MerchantCreateManyInput | Prisma.MerchantCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MerchantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MerchantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MerchantUpdateInput, Prisma.MerchantUncheckedUpdateInput>;
    where: Prisma.MerchantWhereUniqueInput;
};
export type MerchantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MerchantUpdateManyMutationInput, Prisma.MerchantUncheckedUpdateManyInput>;
    where?: Prisma.MerchantWhereInput;
    limit?: number;
};
export type MerchantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MerchantUpdateManyMutationInput, Prisma.MerchantUncheckedUpdateManyInput>;
    where?: Prisma.MerchantWhereInput;
    limit?: number;
    include?: Prisma.MerchantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MerchantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where: Prisma.MerchantWhereUniqueInput;
    create: Prisma.XOR<Prisma.MerchantCreateInput, Prisma.MerchantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MerchantUpdateInput, Prisma.MerchantUncheckedUpdateInput>;
};
export type MerchantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
    where: Prisma.MerchantWhereUniqueInput;
};
export type MerchantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MerchantWhereInput;
    limit?: number;
};
export type Merchant$businessesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MerchantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MerchantSelect<ExtArgs> | null;
    omit?: Prisma.MerchantOmit<ExtArgs> | null;
    include?: Prisma.MerchantInclude<ExtArgs> | null;
};
