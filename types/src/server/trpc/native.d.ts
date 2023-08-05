export declare const cc: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: Request;
        native: typeof import("../../../native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    render: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        _input_in: {
            height: number;
            width: number;
            url: string;
        };
        _input_out: {
            height: number;
            width: number;
            url: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        width: number;
        palette: {
            [k: string]: number;
        };
        pixels: number[];
    }>;
}>;
export declare const hatsuon: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: Request;
        native: typeof import("../../../native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    render: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("../../../native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            req: Request;
            native: typeof import("../../../native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        _input_in: {
            str: string;
            pitches: number[];
        };
        _input_out: {
            str: string;
            pitches: number[];
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, string>;
}>;
