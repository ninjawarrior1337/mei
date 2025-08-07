export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: Request;
        native: typeof import("native/pkg/mei_native");
        tokubetsu: import("../../tokubetsu").Tokubetsu;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    hello: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
        meta: object;
    }>;
    tokubetsu: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            req: Request;
            native: typeof import("native/pkg/mei_native");
            tokubetsu: import("../../tokubetsu").Tokubetsu;
        };
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        birthdayToday: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../../tokubetsu").Character | null;
            meta: object;
        }>;
        birthdaysToday: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../../tokubetsu").Character[];
            meta: object;
        }>;
        proxBirthday: import("@trpc/server").TRPCQueryProcedure<{
            input: "next" | "previous";
            output: import("../../tokubetsu").Character;
            meta: object;
        }>;
        allCharacters: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: import("../../tokubetsu").Character[];
            meta: object;
        }>;
    }>>;
    hatsuon: import("@trpc/server").TRPCBuiltRouter<{
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
    cc: import("@trpc/server").TRPCBuiltRouter<{
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
    spotify: import("@trpc/server").TRPCBuiltRouter<{
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
                entity_picture: string;
                media_content_type: "podcast" | "music";
                media_title: string;
                media_artist: string;
                media_album_name: string;
                media_track: number;
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
}>>;
export type AppRouter = typeof appRouter;
