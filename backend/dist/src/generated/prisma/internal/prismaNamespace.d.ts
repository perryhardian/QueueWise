import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "merchant" | "businessCategory" | "business" | "service" | "queue" | "queueEntry" | "deviceToken" | "notification" | "queueHistory";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Merchant: {
            payload: Prisma.$MerchantPayload<ExtArgs>;
            fields: Prisma.MerchantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MerchantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MerchantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                findFirst: {
                    args: Prisma.MerchantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MerchantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                findMany: {
                    args: Prisma.MerchantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>[];
                };
                create: {
                    args: Prisma.MerchantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                createMany: {
                    args: Prisma.MerchantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MerchantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>[];
                };
                delete: {
                    args: Prisma.MerchantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                update: {
                    args: Prisma.MerchantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                deleteMany: {
                    args: Prisma.MerchantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MerchantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MerchantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>[];
                };
                upsert: {
                    args: Prisma.MerchantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MerchantPayload>;
                };
                aggregate: {
                    args: Prisma.MerchantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMerchant>;
                };
                groupBy: {
                    args: Prisma.MerchantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MerchantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MerchantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MerchantCountAggregateOutputType> | number;
                };
            };
        };
        BusinessCategory: {
            payload: Prisma.$BusinessCategoryPayload<ExtArgs>;
            fields: Prisma.BusinessCategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BusinessCategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BusinessCategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                findFirst: {
                    args: Prisma.BusinessCategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BusinessCategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                findMany: {
                    args: Prisma.BusinessCategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>[];
                };
                create: {
                    args: Prisma.BusinessCategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                createMany: {
                    args: Prisma.BusinessCategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BusinessCategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>[];
                };
                delete: {
                    args: Prisma.BusinessCategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                update: {
                    args: Prisma.BusinessCategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.BusinessCategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BusinessCategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BusinessCategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>[];
                };
                upsert: {
                    args: Prisma.BusinessCategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessCategoryPayload>;
                };
                aggregate: {
                    args: Prisma.BusinessCategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBusinessCategory>;
                };
                groupBy: {
                    args: Prisma.BusinessCategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessCategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BusinessCategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessCategoryCountAggregateOutputType> | number;
                };
            };
        };
        Business: {
            payload: Prisma.$BusinessPayload<ExtArgs>;
            fields: Prisma.BusinessFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BusinessFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                findFirst: {
                    args: Prisma.BusinessFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                findMany: {
                    args: Prisma.BusinessFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                create: {
                    args: Prisma.BusinessCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                createMany: {
                    args: Prisma.BusinessCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                delete: {
                    args: Prisma.BusinessDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                update: {
                    args: Prisma.BusinessUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                deleteMany: {
                    args: Prisma.BusinessDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BusinessUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                upsert: {
                    args: Prisma.BusinessUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                aggregate: {
                    args: Prisma.BusinessAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBusiness>;
                };
                groupBy: {
                    args: Prisma.BusinessGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BusinessCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessCountAggregateOutputType> | number;
                };
            };
        };
        Service: {
            payload: Prisma.$ServicePayload<ExtArgs>;
            fields: Prisma.ServiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findFirst: {
                    args: Prisma.ServiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findMany: {
                    args: Prisma.ServiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                create: {
                    args: Prisma.ServiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                createMany: {
                    args: Prisma.ServiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                delete: {
                    args: Prisma.ServiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                update: {
                    args: Prisma.ServiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                deleteMany: {
                    args: Prisma.ServiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                upsert: {
                    args: Prisma.ServiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                aggregate: {
                    args: Prisma.ServiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateService>;
                };
                groupBy: {
                    args: Prisma.ServiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceCountAggregateOutputType> | number;
                };
            };
        };
        Queue: {
            payload: Prisma.$QueuePayload<ExtArgs>;
            fields: Prisma.QueueFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QueueFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QueueFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                findFirst: {
                    args: Prisma.QueueFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QueueFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                findMany: {
                    args: Prisma.QueueFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>[];
                };
                create: {
                    args: Prisma.QueueCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                createMany: {
                    args: Prisma.QueueCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QueueCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>[];
                };
                delete: {
                    args: Prisma.QueueDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                update: {
                    args: Prisma.QueueUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                deleteMany: {
                    args: Prisma.QueueDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QueueUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QueueUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>[];
                };
                upsert: {
                    args: Prisma.QueueUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueuePayload>;
                };
                aggregate: {
                    args: Prisma.QueueAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQueue>;
                };
                groupBy: {
                    args: Prisma.QueueGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QueueCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueCountAggregateOutputType> | number;
                };
            };
        };
        QueueEntry: {
            payload: Prisma.$QueueEntryPayload<ExtArgs>;
            fields: Prisma.QueueEntryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QueueEntryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QueueEntryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                findFirst: {
                    args: Prisma.QueueEntryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QueueEntryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                findMany: {
                    args: Prisma.QueueEntryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>[];
                };
                create: {
                    args: Prisma.QueueEntryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                createMany: {
                    args: Prisma.QueueEntryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QueueEntryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>[];
                };
                delete: {
                    args: Prisma.QueueEntryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                update: {
                    args: Prisma.QueueEntryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                deleteMany: {
                    args: Prisma.QueueEntryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QueueEntryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QueueEntryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>[];
                };
                upsert: {
                    args: Prisma.QueueEntryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueEntryPayload>;
                };
                aggregate: {
                    args: Prisma.QueueEntryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQueueEntry>;
                };
                groupBy: {
                    args: Prisma.QueueEntryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueEntryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QueueEntryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueEntryCountAggregateOutputType> | number;
                };
            };
        };
        DeviceToken: {
            payload: Prisma.$DeviceTokenPayload<ExtArgs>;
            fields: Prisma.DeviceTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                findFirst: {
                    args: Prisma.DeviceTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                findMany: {
                    args: Prisma.DeviceTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                create: {
                    args: Prisma.DeviceTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                createMany: {
                    args: Prisma.DeviceTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                delete: {
                    args: Prisma.DeviceTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                update: {
                    args: Prisma.DeviceTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>[];
                };
                upsert: {
                    args: Prisma.DeviceTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceTokenPayload>;
                };
                aggregate: {
                    args: Prisma.DeviceTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeviceToken>;
                };
                groupBy: {
                    args: Prisma.DeviceTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceTokenCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        QueueHistory: {
            payload: Prisma.$QueueHistoryPayload<ExtArgs>;
            fields: Prisma.QueueHistoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QueueHistoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QueueHistoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                findFirst: {
                    args: Prisma.QueueHistoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QueueHistoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                findMany: {
                    args: Prisma.QueueHistoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[];
                };
                create: {
                    args: Prisma.QueueHistoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                createMany: {
                    args: Prisma.QueueHistoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QueueHistoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[];
                };
                delete: {
                    args: Prisma.QueueHistoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                update: {
                    args: Prisma.QueueHistoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                deleteMany: {
                    args: Prisma.QueueHistoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QueueHistoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QueueHistoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>[];
                };
                upsert: {
                    args: Prisma.QueueHistoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QueueHistoryPayload>;
                };
                aggregate: {
                    args: Prisma.QueueHistoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQueueHistory>;
                };
                groupBy: {
                    args: Prisma.QueueHistoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueHistoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QueueHistoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QueueHistoryCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus'>;
export type ListEnumQueueStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueStatus[]'>;
export type EnumQueueEntrySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueEntrySource'>;
export type ListEnumQueueEntrySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueEntrySource[]'>;
export type EnumQueueEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueEntryStatus'>;
export type ListEnumQueueEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueueEntryStatus[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    merchant?: Prisma.MerchantOmit;
    businessCategory?: Prisma.BusinessCategoryOmit;
    business?: Prisma.BusinessOmit;
    service?: Prisma.ServiceOmit;
    queue?: Prisma.QueueOmit;
    queueEntry?: Prisma.QueueEntryOmit;
    deviceToken?: Prisma.DeviceTokenOmit;
    notification?: Prisma.NotificationOmit;
    queueHistory?: Prisma.QueueHistoryOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
