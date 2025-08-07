export declare const tokubetsuRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("~/tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    birthdayToday: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: import("~/tokubetsu").Character | null;
        meta: object;
    }>;
    birthdaysToday: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: import("~/tokubetsu").Character[];
        meta: object;
    }>;
    proxBirthday: import("@trpc/server").TRPCQueryProcedure<{
        input: "next" | "previous";
        output: import("~/tokubetsu").Character;
        meta: object;
    }>;
    allCharacters: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: import("~/tokubetsu").Character[];
        meta: object;
    }>;
}>>;
