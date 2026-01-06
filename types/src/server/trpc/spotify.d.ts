export declare const spotify: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    songInfo: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            media_content_type: "podcast" | "music";
            media_title: string;
            media_artist: string;
            media_album_name: string;
            media_track: number;
            entity_picture: string;
            media_content_id: string;
        } | null;
        meta: object;
    }>;
    coverInfo: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            coverUrl: string;
            colors: {
                topk: string[];
                materialYou: {
                    light: Record<"error" | "background" | "outline" | "onError" | "primary" | "onPrimary" | "primaryContainer" | "onPrimaryContainer" | "secondary" | "onSecondary" | "secondaryContainer" | "onSecondaryContainer" | "tertiary" | "onTertiary" | "tertiaryContainer" | "onTertiaryContainer" | "errorContainer" | "onErrorContainer" | "onBackground" | "surface" | "onSurface" | "surfaceVariant" | "onSurfaceVariant" | "outlineVariant" | "shadow" | "scrim" | "inverseSurface" | "inverseOnSurface" | "inversePrimary", string>;
                    dark: Record<"error" | "background" | "outline" | "onError" | "primary" | "onPrimary" | "primaryContainer" | "onPrimaryContainer" | "secondary" | "onSecondary" | "secondaryContainer" | "onSecondaryContainer" | "tertiary" | "onTertiary" | "tertiaryContainer" | "onTertiaryContainer" | "errorContainer" | "onErrorContainer" | "onBackground" | "surface" | "onSurface" | "surfaceVariant" | "onSurfaceVariant" | "outlineVariant" | "shadow" | "scrim" | "inverseSurface" | "inverseOnSurface" | "inversePrimary", string>;
                };
            };
        } | null;
        meta: object;
    }>;
}>>;
