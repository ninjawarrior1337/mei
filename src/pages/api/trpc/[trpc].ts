import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { APIRoute } from 'astro';
import { createContext } from "~/server/trpc/context";
import { appRouter } from '~/server/trpc/router';

export const all: APIRoute = (opts) => {
    return fetchRequestHandler({
        router: appRouter,
        createContext,
        endpoint: "/api/trpc",
        req: opts.request,
        responseMeta(opts) {
            const ONE_HOUR_IN_SECONDS = 60 * 60;
            const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
            const CORS = {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
            }
            return {
                headers: {
                    ...CORS,
                    'cache-control': `s-maxage=${ONE_HOUR_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                },
            }
        }
    })
}