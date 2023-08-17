export declare const tokubetsuRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: Request;
        native: typeof import("../../../native/pkg/mei_native");
        tokubetsu: import("~/tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    birthdayToday: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("~/tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("~/tokubetsu").Tokubetsu;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, import("~/tokubetsu").Character | null>;
    birthdaysToday: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("~/tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("~/tokubetsu").Tokubetsu;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, import("~/tokubetsu").Character[]>;
    proxBirthday: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("~/tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("~/tokubetsu").Tokubetsu;
        };
        _input_in: "next" | "previous";
        _input_out: "next" | "previous";
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("~/tokubetsu").Character>;
    allCharacters: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("~/tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("~/tokubetsu").Tokubetsu;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, import("~/tokubetsu").Character[]>;
}>;
