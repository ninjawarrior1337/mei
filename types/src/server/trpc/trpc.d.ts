export declare const t: import("@trpc/server").TRPCRootObject<{
    req: Request;
    native: typeof import("native/pkg/mei_native");
    tokubetsu: import("../../tokubetsu").Tokubetsu;
}, object, import("@trpc/server").TRPCRuntimeConfigOptions<{
    req: Request;
    native: typeof import("native/pkg/mei_native");
    tokubetsu: import("../../tokubetsu").Tokubetsu;
}, object>, {
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const procedure: import("@trpc/server").TRPCProcedureBuilder<{
    req: Request;
    native: typeof import("native/pkg/mei_native");
    tokubetsu: import("../../tokubetsu").Tokubetsu;
}, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
