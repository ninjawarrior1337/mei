export declare const cc: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    render: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            url: string;
            width: number;
            height: number;
        };
        output: {
            width: number;
            palette: {
                [k: string]: number;
            };
            pixels: number[];
        };
        meta: object;
    }>;
}>>;
export declare const hatsuon: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    render: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            str: string;
            pitches: number[];
        };
        output: string;
        meta: object;
    }>;
}>>;
