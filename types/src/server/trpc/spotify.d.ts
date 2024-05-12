export declare const spotify: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
