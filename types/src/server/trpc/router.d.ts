export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    hello: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _ctx_out: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, string>;
    tokubetsu: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        birthdayToday: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, import("../../tokubetsu").Character | null>;
        birthdaysToday: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, import("../../tokubetsu").Character[]>;
        proxBirthday: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: "next" | "previous";
            _input_out: "next" | "previous";
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("../../tokubetsu").Character>;
        allCharacters: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, import("../../tokubetsu").Character[]>;
    }>;
    hatsuon: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
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
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
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
    cc: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
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
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
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
    spotify: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
    }>, {
        songInfo: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, {
            entity_picture: string;
            media_content_type: "podcast" | "music";
            media_title: string;
            media_artist: string;
            media_album_name: string;
            media_track: number;
            media_content_id: string;
        } | null>;
        coverInfo: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: Request;
                    native: typeof import("native/pkg/mei_native");
                    tokubetsu: import("../../tokubetsu").Tokubetsu;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
                req: Request;
                native: typeof import("native/pkg/mei_native");
                tokubetsu: import("../../tokubetsu").Tokubetsu;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, {
            coverUrl: string;
            colors: {
                topk: string[];
                materialYou: {
                    light: Record<"error" | "background" | "outline" | "onError" | "primary" | "onPrimary" | "primaryContainer" | "onPrimaryContainer" | "secondary" | "onSecondary" | "secondaryContainer" | "onSecondaryContainer" | "tertiary" | "onTertiary" | "tertiaryContainer" | "onTertiaryContainer" | "errorContainer" | "onErrorContainer" | "onBackground" | "surface" | "onSurface" | "surfaceVariant" | "onSurfaceVariant" | "outlineVariant" | "shadow" | "scrim" | "inverseSurface" | "inverseOnSurface" | "inversePrimary", string>;
                    dark: Record<"error" | "background" | "outline" | "onError" | "primary" | "onPrimary" | "primaryContainer" | "onPrimaryContainer" | "secondary" | "onSecondary" | "secondaryContainer" | "onSecondaryContainer" | "tertiary" | "onTertiary" | "tertiaryContainer" | "onTertiaryContainer" | "errorContainer" | "onErrorContainer" | "onBackground" | "surface" | "onSurface" | "surfaceVariant" | "onSurfaceVariant" | "outlineVariant" | "shadow" | "scrim" | "inverseSurface" | "inverseOnSurface" | "inversePrimary", string>;
                };
            };
        } | null>;
    }>;
}>;
export type AppRouter = typeof appRouter;
