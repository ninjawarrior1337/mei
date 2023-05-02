import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { APIRoute } from 'astro';
import { createContext } from "~/trpc/context";
import { appRouter } from '~/trpc/router';

export const all: APIRoute = (opts) => {
    return fetchRequestHandler({
        router: appRouter,
        createContext,
        endpoint: "/api/trpc",
        req: opts.request,
        responseMeta(opts) {
            const ONE_HOUR_IN_SECONDS = 60 * 60;
            const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
            return {
                headers: {
                    'cache-control': `s-maxage=${ONE_HOUR_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                },
            }
        }
    })
}